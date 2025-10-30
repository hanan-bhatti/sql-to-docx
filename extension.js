const vscode = require('vscode');
const sql = require('mssql');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const { 
  Document, 
  Packer, 
  Paragraph, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  ShadingType,
  TextRun
} = require('docx');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

class SQLToDocxExtension {
  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('SQL to DOCX');
    this.connectionPool = null;
    this.statusBarItem = null;
  }

  /**
   * Check if SQL Tools extension is installed
   */
  async checkSQLToolsInstalled() {
    const sqlTools = vscode.extensions.getExtension('mtxr.sqltools');
    const sqlToolsDriver = vscode.extensions.getExtension('mtxr.sqltools-driver-mssql');
    
    if (!sqlTools || !sqlToolsDriver) {
      const install = await vscode.window.showErrorMessage(
        'SQL Tools and SQL Tools MSSQL Driver extensions are required.',
        'Install Extensions',
        'Cancel'
      );
      
      if (install === 'Install Extensions') {
        vscode.commands.executeCommand('workbench.extensions.search', '@id:mtxr.sqltools');
      }
      return false;
    }
    
    this.log('✓ SQL Tools extensions are installed');
    return true;
  }

  /**
   * Check if SQL Server is running (Windows specific)
   */
  async checkSQLServerRunning() {
    try {
      if (process.platform === 'win32') {
        const { stdout } = await execAsync('sc query MSSQLSERVER');
        const isRunning = stdout.includes('RUNNING');
        
        if (!isRunning) {
          const start = await vscode.window.showWarningMessage(
            'SQL Server service (MSSQLSERVER) is not running.',
            'Start Service',
            'Continue Anyway'
          );
          
          if (start === 'Start Service') {
            await vscode.window.showInformationMessage(
              'Please start SQL Server manually from Services or SQL Server Configuration Manager.'
            );
            return false;
          }
        } else {
          this.log('✓ SQL Server is running');
        }
        return true;
      } else {
        // For Linux/Mac, just try to connect
        this.log('⚠ Non-Windows platform detected. Skipping service check.');
        return true;
      }
    } catch (error) {
      this.log(`⚠ Could not check SQL Server status: ${error.message}`);
      return true; // Continue anyway
    }
  }

  /**
   * Get connection from SQL Tools
   */
  async getSQLToolsConnection() {
    try {
      // Try to get active SQL Tools connection
      const connections = await vscode.commands.executeCommand('sqltools.getConnections');
      
      if (!connections || connections.length === 0) {
        const setup = await vscode.window.showWarningMessage(
          'No SQL Tools connections found. Please set up a connection first.',
          'Open SQL Tools',
          'Cancel'
        );
        
        if (setup === 'Open SQL Tools') {
          await vscode.commands.executeCommand('workbench.view.extension.sqltoolsActivityBarContainer');
        }
        return null;
      }

      // Let user select a connection
      const connectionItems = connections.map(conn => ({
        label: conn.name,
        description: `${conn.server}${conn.database ? ' - ' + conn.database : ''}`,
        connection: conn
      }));

      const selected = await vscode.window.showQuickPick(connectionItems, {
        placeHolder: 'Select SQL Server connection'
      });

      if (!selected) return null;

      return selected.connection;
    } catch (error) {
      this.log(`Error getting SQL Tools connection: ${error.message}`);
      return null;
    }
  }

  /**
   * Connect to SQL Server
   */
  async connect() {
    if (this.connectionPool && this.connectionPool.connected) {
      return this.connectionPool;
    }

    const sqlToolsConnection = await this.getSQLToolsConnection();
    if (!sqlToolsConnection) {
      throw new Error('No connection selected');
    }

    const config = {
      server: sqlToolsConnection.server,
      database: sqlToolsConnection.database,
      options: {
        trustServerCertificate: true,
        encrypt: true,
        enableArithAbort: true
      }
    };

    // Handle authentication
    if (sqlToolsConnection.mssqlOptions?.authenticationType === 'SqlLogin') {
      config.user = sqlToolsConnection.username;
      config.password = sqlToolsConnection.password;
    } else {
      // Windows Authentication
      config.options.trustedConnection = true;
      config.authentication = {
        type: 'ntlm',
        options: {
          domain: sqlToolsConnection.domain || '',
          userName: sqlToolsConnection.username || '',
          password: sqlToolsConnection.password || ''
        }
      };
    }

    this.log(`Connecting to ${config.server}...`);
    this.connectionPool = await sql.connect(config);
    this.log('✓ Connected successfully');
    
    this.updateStatusBar('Connected', true);
    return this.connectionPool;
  }

  /**
   * Parse SQL queries from text
   */
  parseQueries(sqlText) {
    // Split by semicolon, but not within strings or comments
    const queries = [];
    let currentQuery = '';
    let inString = false;
    let inComment = false;
    let stringChar = '';

    for (let i = 0; i < sqlText.length; i++) {
      const char = sqlText[i];
      const nextChar = sqlText[i + 1];

      // Handle comments
      if (!inString && char === '-' && nextChar === '-') {
        inComment = true;
        currentQuery += char;
        continue;
      }
      
      if (inComment && char === '\n') {
        inComment = false;
        currentQuery += char;
        continue;
      }

      // Handle strings
      if (!inComment && (char === "'" || char === '"')) {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar && sqlText[i - 1] !== '\\') {
          inString = false;
        }
      }

      // Handle semicolon
      if (!inString && !inComment && char === ';') {
        queries.push(currentQuery.trim());
        currentQuery = '';
        continue;
      }

      currentQuery += char;
    }

    // Add last query if exists
    if (currentQuery.trim()) {
      queries.push(currentQuery.trim());
    }

    return queries.filter(q => q.length > 0);
  }

  /**
   * Execute a single query
   */
  async executeQuery(query, maxRows = 10) {
    try {
      const request = new sql.Request(this.connectionPool);
      const result = await request.query(query);
      
      return {
        success: true,
        recordset: result.recordset || [],
        rowsAffected: result.rowsAffected[0] || 0,
        totalRows: result.recordset ? result.recordset.length : 0
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Create document sections from query results
   */
  createDocumentSections(queryResults) {
    const children = [];

    queryResults.forEach((result, index) => {
      // Add query header
      children.push(
        new Paragraph({
          text: `Query ${index + 1}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 }
        })
      );

      // Add query text with better formatting
      const queryLines = result.query.split('\n');
      queryLines.forEach(line => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: line,
                font: 'Consolas',
                size: 20
              })
            ],
            spacing: { after: 0 }
          })
        );
      });

      children.push(
        new Paragraph({
          text: '',
          spacing: { after: 200 }
        })
      );

      // Add results
      if (!result.success) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: '❌ Error: ',
                bold: true,
                color: 'DC143C'
              }),
              new TextRun({
                text: result.error,
                color: 'DC143C'
              })
            ],
            spacing: { after: 400 }
          })
        );
      } else if (result.recordset.length === 0) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: '✓ Query executed successfully. ',
                bold: true,
                color: '228B22'
              }),
              new TextRun({
                text: `Rows affected: ${result.rowsAffected}`,
                italics: true
              })
            ],
            spacing: { after: 400 }
          })
        );
      } else {
        // Create results table
        const columns = Object.keys(result.recordset[0]);
        const displayRows = result.recordset.slice(0, result.maxRows);

        const tableRows = [
          // Header row
          new TableRow({
            children: columns.map(col => 
              new TableCell({
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: col,
                        bold: true,
                        color: 'FFFFFF'
                      })
                    ],
                    alignment: AlignmentType.CENTER
                  })
                ],
                shading: {
                  type: ShadingType.SOLID,
                  color: '4472C4'
                },
                margins: {
                  top: 100,
                  bottom: 100,
                  left: 100,
                  right: 100
                }
              })
            ),
            tableHeader: true
          }),
          // Data rows
          ...displayRows.map((row, rowIndex) => 
            new TableRow({
              children: columns.map(col => 
                new TableCell({
                  children: [
                    new Paragraph({
                      text: this.formatCellValue(row[col]),
                      alignment: AlignmentType.LEFT
                    })
                  ],
                  shading: {
                    type: ShadingType.SOLID,
                    color: rowIndex % 2 === 0 ? 'F2F2F2' : 'FFFFFF'
                  },
                  margins: {
                    top: 80,
                    bottom: 80,
                    left: 100,
                    right: 100
                  }
                })
              )
            })
          )
        ];

        children.push(
          new Table({
            rows: tableRows,
            width: {
              size: 100,
              type: WidthType.PERCENTAGE
            },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
              insideVertical: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' }
            }
          })
        );

        // Add result summary
        if (result.totalRows > result.maxRows) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `... showing ${result.maxRows} of ${result.totalRows} results`,
                  italics: true,
                  color: '666666'
                })
              ],
              spacing: { before: 100, after: 400 }
            })
          );
        } else {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `✓ Total results: ${result.totalRows}`,
                  bold: true,
                  color: '228B22'
                })
              ],
              spacing: { before: 100, after: 400 }
            })
          );
        }
      }

      // Add separator
      children.push(
        new Paragraph({
          text: '─'.repeat(100),
          spacing: { before: 200, after: 200 }
        })
      );
    });

    return children;
  }

  /**
   * Format cell value for display
   */
  formatCellValue(value) {
    if (value === null || value === undefined) {
      return 'NULL';
    }
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    if (typeof value === 'boolean') {
      return value ? 'TRUE' : 'FALSE';
    }
    return String(value);
  }

  /**
   * Get or create document path
   */
  getDocumentPath(sqlFilePath) {
    const dir = path.dirname(sqlFilePath);
    const baseName = path.basename(sqlFilePath, '.sql');
    return path.join(dir, `${baseName}_results.docx`);
  }

  /**
   * Load existing document
   */
  async loadExistingDocument(docPath) {
    try {
      if (fsSync.existsSync(docPath)) {
        const buffer = await fs.readFile(docPath);
        // Note: docx library doesn't support reading, so we'll create a new doc
        // and inform the user we're appending
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  /**
   * Append to existing document (create new with header indicating append)
   */
  async appendToDocument(docPath, newSections) {
    const exists = await this.loadExistingDocument(docPath);
    
    const children = [];
    
    if (exists) {
      children.push(
        new Paragraph({
          text: '═'.repeat(100),
          spacing: { before: 400, after: 200 }
        }),
        new Paragraph({
          text: `Appended Results - ${new Date().toLocaleString()}`,
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 400 }
        })
      );
    } else {
      children.push(
        new Paragraph({
          text: 'SQL Query Results',
          heading: HeadingLevel.TITLE,
          spacing: { after: 200 }
        }),
        new Paragraph({
          text: `Generated on: ${new Date().toLocaleString()}`,
          spacing: { after: 400 }
        })
      );
    }

    children.push(...newSections);

    return children;
  }

  /**
   * Save document
   */
  async saveDocument(docPath, children, append = true) {
    const doc = new Document({
      sections: [{
        properties: {},
        children: children
      }]
    });

    const buffer = await Packer.toBuffer(doc);
    
    if (append && fsSync.existsSync(docPath)) {
      // For true append, we'd need to read existing docx
      // Since docx library doesn't support reading, we create a marker
      const timestamp = new Date().getTime();
      const backupPath = docPath.replace('.docx', `_backup_${timestamp}.docx`);
      await fs.rename(docPath, backupPath);
      this.log(`Previous version backed up to: ${path.basename(backupPath)}`);
    }

    await fs.writeFile(docPath, buffer);
    this.log(`✓ Document saved: ${docPath}`);
  }

  /**
   * Run all queries in file
   */
  async runAllQueries() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return vscode.window.showErrorMessage('No SQL file is open.');
    }

    if (editor.document.languageId !== 'sql') {
      return vscode.window.showWarningMessage('Active file is not a SQL file.');
    }

    const sqlText = editor.document.getText().trim();
    if (!sqlText) {
      return vscode.window.showErrorMessage('SQL file is empty.');
    }

    await this.executeAndSave(sqlText, editor.document.fileName, false);
  }

  /**
   * Run selected query
   */
  async runSelectedQuery() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return vscode.window.showErrorMessage('No SQL file is open.');
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection).trim();
    
    if (!selectedText) {
      return vscode.window.showWarningMessage('No query selected. Please select a SQL query.');
    }

    await this.executeAndSave(selectedText, editor.document.fileName, true);
  }

  /**
   * Execute queries and save to document
   */
  async executeAndSave(sqlText, filePath, append = true) {
    const config = vscode.workspace.getConfiguration('sqlToDocx');
    const maxRows = config.get('maxRows', 10);

    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'SQL to DOCX',
      cancellable: false
    }, async (progress) => {
      try {
        // Step 1: Check prerequisites
        progress.report({ message: 'Checking prerequisites...', increment: 10 });
        
        if (!await this.checkSQLToolsInstalled()) {
          return;
        }

        if (!await this.checkSQLServerRunning()) {
          return;
        }

        // Step 2: Connect
        progress.report({ message: 'Connecting to SQL Server...', increment: 10 });
        await this.connect();

        // Step 3: Parse queries
        progress.report({ message: 'Parsing queries...', increment: 10 });
        const queries = this.parseQueries(sqlText);
        
        if (queries.length === 0) {
          throw new Error('No valid SQL queries found.');
        }

        this.log(`Found ${queries.length} quer${queries.length === 1 ? 'y' : 'ies'}`);

        // Step 4: Execute queries
        const queryResults = [];
        const incrementPerQuery = 50 / queries.length;

        for (let i = 0; i < queries.length; i++) {
          progress.report({ 
            message: `Executing query ${i + 1}/${queries.length}...`,
            increment: incrementPerQuery
          });

          const result = await this.executeQuery(queries[i], maxRows);
          queryResults.push({
            query: queries[i],
            maxRows: maxRows,
            ...result
          });
        }

        // Step 5: Create document
        progress.report({ message: 'Creating document...', increment: 10 });
        const docPath = this.getDocumentPath(filePath);
        const sections = this.createDocumentSections(queryResults);
        
        let children;
        if (append) {
          children = await this.appendToDocument(docPath, sections);
        } else {
          // Ask user if they want to overwrite
          const exists = fsSync.existsSync(docPath);
          if (exists) {
            const choice = await vscode.window.showWarningMessage(
              `Document ${path.basename(docPath)} already exists. Do you want to overwrite it?`,
              'Overwrite',
              'Append',
              'Cancel'
            );
            
            if (choice === 'Cancel') {
              return;
            }
            
            if (choice === 'Append') {
              children = await this.appendToDocument(docPath, sections);
            } else {
              children = sections;
            }
          } else {
            children = sections;
          }
        }

        // Step 6: Save document
        progress.report({ message: 'Saving document...', increment: 10 });
        await this.saveDocument(docPath, children, append);

        // Step 7: Show success message
        const action = await vscode.window.showInformationMessage(
          `✓ Results exported to ${path.basename(docPath)}`,
          'Open Document',
          'Show in Explorer'
        );

        if (action === 'Open Document') {
          await vscode.env.openExternal(vscode.Uri.file(docPath));
        } else if (action === 'Show in Explorer') {
          await vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(docPath));
        }

      } catch (error) {
        this.log(`❌ Error: ${error.message}`);
        vscode.window.showErrorMessage(`SQL to DOCX Error: ${error.message}`);
      }
    });
  }

  /**
   * Update status bar
   */
  updateStatusBar(text, connected = false) {
    if (!this.statusBarItem) {
      this.statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        100
      );
      this.statusBarItem.show();
    }

    this.statusBarItem.text = `$(database) ${text}`;
    this.statusBarItem.tooltip = connected ? 'Connected to SQL Server' : 'Not connected';
    this.statusBarItem.backgroundColor = connected 
      ? new vscode.ThemeColor('statusBarItem.prominentBackground')
      : undefined;
  }

  /**
   * Log to output channel
   */
  log(message) {
    const timestamp = new Date().toLocaleTimeString();
    this.outputChannel.appendLine(`[${timestamp}] ${message}`);
  }

  /**
   * Dispose resources
   */
  async dispose() {
    if (this.connectionPool) {
      await this.connectionPool.close();
    }
    if (this.statusBarItem) {
      this.statusBarItem.dispose();
    }
    this.outputChannel.dispose();
  }
}

let extensionInstance;

/**
 * Activate extension
 */
function activate(context) {
  console.log('SQL to DOCX extension is now active');

  extensionInstance = new SQLToDocxExtension();

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('sqlToDocx.runAllQueries', () => {
      extensionInstance.runAllQueries();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('sqlToDocx.runSelectedQuery', () => {
      extensionInstance.runSelectedQuery();
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('sqlToDocx.showOutput', () => {
      extensionInstance.outputChannel.show();
    })
  );

  // Add status bar
  extensionInstance.updateStatusBar('Ready', false);

  // Register disposal
  context.subscriptions.push({
    dispose: () => extensionInstance.dispose()
  });
}

/**
 * Deactivate extension
 */
function deactivate() {
  if (extensionInstance) {
    return extensionInstance.dispose();
  }
}

module.exports = {
  activate,
  deactivate
};