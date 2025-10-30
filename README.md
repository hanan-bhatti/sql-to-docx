# SQL to DOCX Exporter

<p align="center">
  <img src="/images/icon.png" alt="SQL to DOCX Logo" width="128" height="128">
</p>

<p align="center">
  <strong>Execute SQL queries and export results to beautifully formatted DOCX documents</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#requirements">Requirements</a> •
  <a href="#troubleshooting">Troubleshooting</a>
</p>

---

## 🎯 Overview

SQL to DOCX Exporter is a powerful Visual Studio Code extension that seamlessly integrates SQL query execution with professional document generation. Execute queries directly from your SQL files and automatically generate beautifully formatted Word documents containing your query results.

Perfect for:
- 📊 **Database Analysts** - Generate reports from SQL queries
- 👨‍💻 **Developers** - Document database schemas and query results
- 📝 **Technical Writers** - Create database documentation
- 🎓 **Students** - Submit SQL assignments with results
- 🏢 **Enterprise Teams** - Share query results with stakeholders

---

## ✨ Features

### 🚀 Core Functionality

- **🔄 Execute All Queries**: Run all queries in your SQL file sequentially
- **✂️ Execute Selected Query**: Right-click and execute only the selected query
- **📄 Append Mode**: Automatically append new results to existing documents
- **💾 Smart Document Management**: Creates or updates documents based on SQL filename
- **🎨 Beautiful Formatting**: Professional table layouts with alternating row colors
- **⚡ Progress Tracking**: Real-time progress indicators for long-running queries
- **🔍 Intelligent Query Parsing**: Handles complex SQL with strings and comments

### 🛡️ Safety & Reliability

- **✅ Prerequisite Checking**: Verifies SQL Tools and SQL Server availability
- **🔐 Secure Connection**: Integrates with SQL Tools connection management
- **📊 Error Handling**: Displays errors in documents with detailed messages
- **💾 Automatic Backup**: Creates backups before overwriting documents
- **📝 Comprehensive Logging**: Detailed output channel for debugging

### 🎨 Document Features

- **📋 Query Numbering**: Clear identification of each query
- **🔤 Monospace Query Display**: SQL code in professional monospace font
- **📊 Responsive Tables**: Auto-sized columns with proper spacing
- **🎨 Color-Coded Results**: Headers in blue, alternating row colors
- **📈 Result Statistics**: Shows row counts and affected rows
- **⚠️ Error Display**: Clear error messages with red highlighting
- **📅 Timestamps**: Document generation and append timestamps

---

## 📦 Installation

### Method 1: Visual Studio Code Marketplace

1. Open VS Code
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
3. Search for "SQL to DOCX Exporter"
4. Click **Install**

### Method 2: Install from VSIX

1. Download the `.vsix` file from [Releases](https://github.com/your-username/sql-to-docx/releases)
2. Open VS Code
3. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
4. Type "Install from VSIX"
5. Select the downloaded file

### Method 3: Build from Source

```bash
# Clone the repository
git clone https://github.com/your-username/sql-to-docx.git
cd sql-to-docx

# Install dependencies
npm install

# Package the extension
npm run package

# Install in VS Code
code --install-extension sql-to-docx-1.0.0.vsix
```

---

## 🔧 Requirements

### Required Extensions

This extension **requires** the following VS Code extensions to be installed:

1. **[SQL Tools](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools)** (mtxr.sqltools)
2. **[SQL Tools MS SQL Server Driver](https://marketplace.visualstudio.com/items?itemName=mtxr.sqltools-driver-mssql)** (mtxr.sqltools-driver-mssql)

The extension will automatically prompt you to install these if they're missing.

### System Requirements

- **Visual Studio Code**: Version 1.80.0 or higher
- **SQL Server**: Any version (2012 or later recommended)
  - SQL Server Express
  - SQL Server Developer Edition
  - SQL Server Standard/Enterprise
  - Azure SQL Database
- **Operating System**: 
  - Windows 10/11
  - macOS 10.15 or later
  - Linux (Ubuntu 18.04+, Debian 10+, RHEL 7+)

### SQL Server Status

- **Windows**: SQL Server service should be running (MSSQLSERVER or named instance)
- **macOS/Linux**: SQL Server for Linux should be running

---

## 🚀 Usage

### Initial Setup

1. **Install Required Extensions**
   - The extension will check and prompt if SQL Tools is not installed

2. **Configure SQL Tools Connection**
   - Open SQL Tools sidebar (Database icon in activity bar)
   - Click "Add New Connection"
   - Select "MSSQL"
   - Enter connection details:
     - **Connection name**: My Database
     - **Server**: localhost or server address
     - **Database**: YourDatabase
     - **Authentication**: SQL Login or Windows Authentication
     - **Username/Password**: Your credentials
   - Test and save connection

### Running Queries

#### Option 1: Execute All Queries in File

**Method A: Command Palette**
1. Open a `.sql` file
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type "SQL to DOCX: Export All Queries"
4. Press Enter

**Method B: Keyboard Shortcut**
- Press `Ctrl+Shift+E` (Windows/Linux) or `Cmd+Shift+E` (Mac)

**Method C: Editor Toolbar**
- Click the document icon in the editor toolbar (top-right)

#### Option 2: Execute Selected Query

**Method A: Context Menu**
1. Select a query in your SQL file
2. Right-click on the selection
3. Choose "SQL to DOCX: Export Selected Query"

**Method B: Keyboard Shortcut**
- Select query text
- Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### Document Behavior

#### First Run
- Creates `filename_results.docx` in the same directory as your SQL file
- Includes document title, timestamp, and all query results

#### Subsequent Runs
- **Default**: Appends new results to existing document with timestamp separator
- **Overwrite**: Shows prompt if you want to overwrite when running all queries
- **Backup**: Previous versions are automatically backed up with timestamp

---

## ⚙️ Configuration

Access settings via: **File** → **Preferences** → **Settings** → Search "SQL to DOCX"

### Available Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `sqlToDocx.maxRows` | number | `10` | Maximum rows to export per query (1-1000) |
| `sqlToDocx.autoAppend` | boolean | `true` | Automatically append to existing documents |
| `sqlToDocx.showOutputOnError` | boolean | `true` | Show output channel on errors |
| `sqlToDocx.dateFormat` | string | `YYYY-MM-DD` | Date format in documents |
| `sqlToDocx.checkSQLServerStatus` | boolean | `true` | Check if SQL Server is running (Windows) |

### Example Configuration

Add to your `settings.json`:

```json
{
  "sqlToDocx.maxRows": 20,
  "sqlToDocx.autoAppend": true,
  "sqlToDocx.dateFormat": "MM/DD/YYYY",
  "sqlToDocx.showOutputOnError": true,
  "sqlToDocx.checkSQLServerStatus": true
}
```

---

## 📝 Example

### Input SQL File: `sales_report.sql`

```sql
-- Get top 10 customers
SELECT TOP 10 
    CustomerID, 
    CustomerName, 
    TotalOrders,
    TotalRevenue
FROM Customers
ORDER BY TotalRevenue DESC;

-- Monthly sales summary
SELECT 
    YEAR(OrderDate) AS Year,
    MONTH(OrderDate) AS Month,
    COUNT(*) AS OrderCount,
    SUM(TotalAmount) AS Revenue
FROM Orders
WHERE OrderDate >= '2024-01-01'
GROUP BY YEAR(OrderDate), MONTH(OrderDate)
ORDER BY Year, Month;

-- Update product prices
UPDATE Products
SET Price = Price * 1.05
WHERE Category = 'Electronics';
```

### Output Document: `sales_report_results.docx`

The generated document will contain:

1. **Document Header**
   - Title: "SQL Query Results"
   - Timestamp: "Generated on: 10/29/2025, 3:45:22 PM"

2. **Query 1**
   - Query text in monospace font
   - Beautiful table with:
     - Blue header row with white text
     - Alternating gray/white data rows
     - All 10 customer records
     - Summary: "✓ Total results: 10"

3. **Query 2**
   - Query text
   - Monthly sales table
   - Summary with result count

4. **Query 3**
   - Query text
   - Success message: "✓ Query executed successfully. Rows affected: 45"

---

## 🎨 Document Styling

### Table Design

- **Header Row**: 
  - Background: Professional Blue (#4472C4)
  - Text: White, Bold, Centered
  - Padding: 10px all sides

- **Data Rows**:
  - Even rows: Light Gray (#F2F2F2)
  - Odd rows: White
  - Text: Black, Left-aligned
  - Padding: 8px vertical, 10px horizontal

- **Borders**:
  - Outer: Solid black (1pt)
  - Inner: Solid gray (#CCCCCC, 1pt)

### Query Display

- **Font**: Consolas (monospace)
- **Size**: 10pt
- **Color**: Black
- **Spacing**: Preserved from original formatting

### Status Messages

- **Success**: Green (#228B22), Bold
- **Errors**: Red (#DC143C), Bold
- **Info**: Gray (#666666), Italic

---

## 🔍 Troubleshooting

### Extension Not Activating

**Problem**: Extension doesn't activate when opening SQL files

**Solutions**:
1. Ensure file has `.sql` extension
2. Check VS Code version (requires 1.80.0+)
3. Reload VS Code: `Ctrl+Shift+P` → "Developer: Reload Window"
4. Check extension is enabled: Extensions panel → Search "SQL to DOCX"

### SQL Tools Not Found

**Problem**: "SQL Tools extension is required" error

**Solutions**:
1. Click "Install Extensions" in the error message
2. Manually install:
   - Search "SQL Tools" in Extensions
   - Install both "SQL Tools" and "SQL Tools MSSQL Driver"
3. Reload VS Code after installation

### Cannot Connect to SQL Server

**Problem**: Connection fails when running queries

**Solutions**:

1. **Check SQL Server Status (Windows)**
   ```cmd
   sc query MSSQLSERVER
   ```
   Start if stopped:
   ```cmd
   net start MSSQLSERVER
   ```

2. **Verify Connection in SQL Tools**
   - Open SQL Tools sidebar
   - Test your connection
   - Update credentials if needed

3. **Check Firewall**
   - Ensure port 1433 is open
   - Add SQL Server exception to firewall

4. **Connection String Issues**
   - Verify server name (use `localhost` or `.\SQLEXPRESS` for local)
   - Check database name exists
   - Verify authentication type matches SQL Server settings

### SQL Server Not Running (Windows)

**Problem**: "SQL Server service is not running"

**Solutions**:

1. **Via Services**
   - Press `Win+R`, type `services.msc`
   - Find "SQL Server (MSSQLSERVER)" or your named instance
   - Right-click → Start

2. **Via Command Line (Admin)**
   ```cmd
   net start MSSQLSERVER
   ```

3. **Via SQL Server Configuration Manager**
   - Open SQL Server Configuration Manager
   - Navigate to SQL Server Services
   - Right-click service → Start

### Query Parsing Issues

**Problem**: Queries not splitting correctly

**Solutions**:
1. Ensure queries end with semicolon (`;`)
2. Check for semicolons inside strings (use double quotes or escape)
3. Remove GO statements (not supported by mssql npm package)
4. Avoid comments with semicolons

### Document Not Creating

**Problem**: No DOCX file created after execution

**Solutions**:
1. Check file permissions in target directory
2. View Output channel: `Ctrl+Shift+P` → "SQL to DOCX: Show Output"
3. Look for error messages in output
4. Ensure sufficient disk space

### Performance Issues

**Problem**: Extension slow with large result sets

**Solutions**:
1. Reduce `maxRows` setting (Settings → SQL to DOCX → Max Rows)
2. Add `TOP` clause to queries to limit results
3. Use more specific WHERE clauses
4. Split large queries into multiple smaller ones

### Memory Issues

**Problem**: VS Code crashes with large exports

**Solutions**:
1. Lower `maxRows` to 10 or less
2. Export queries one at a time using selection
3. Increase VS Code memory limit:
   ```json
   {
     "window.zoomLevel": 0,
     "files.maxMemoryForLargeFilesMB": 4096
   }
   ```

---

## 🔐 Security Considerations

### Connection Security

- ✅ **Uses SQL Tools**: Leverages secure SQL Tools connection management
- ✅ **No Password Storage**: Extension doesn't store credentials
- ✅ **Encrypted Connections**: Supports TLS/SSL encryption
- ✅ **Windows Auth**: Supports integrated Windows authentication

### Best Practices

1. **Use Least Privilege**: Connect with minimum required permissions
2. **Avoid Hardcoding**: Never put credentials in SQL files
3. **Secure Documents**: Be cautious when sharing generated DOCX files
4. **Audit Queries**: Review queries before execution
5. **Limit Exports**: Use `maxRows` to prevent accidental large exports

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Bugs

1. Check [existing issues](https://github.com/your-username/sql-to-docx/issues)
2. Create new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - VS Code version
   - Extension version
   - SQL Server version

### Feature Requests

1. Check [feature requests](https://github.com/your-username/sql-to-docx/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
2. Create new issue with:
   - Use case description
   - Proposed solution
   - Alternative solutions considered

### Pull Requests

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Make changes and test thoroughly
4. Commit: `git commit -m 'Add AmazingFeature'`
5. Push: `git push origin feature/AmazingFeature`
6. Open Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/sql-to-docx.git
cd sql-to-docx

# Install dependencies
npm install

# Open in VS Code
code .

# Press F5 to launch Extension Development Host
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support

### Getting Help

- 📖 [Documentation](https://github.com/your-username/sql-to-docx/wiki)
- 🐛 [Issue Tracker](https://github.com/your-username/sql-to-docx/issues)
- 💬 [Discussions](https://github.com/your-username/sql-to-docx/discussions)
- 📧 Email: support@yourdomain.com

### FAQ

**Q: Can I export to other formats like PDF or Excel?**
A: Currently only DOCX is supported. PDF and Excel exports are planned for future releases.

**Q: Does this work with other databases like PostgreSQL or MySQL?**
A: Currently only MS SQL Server is supported. Other databases may be added in future versions.

**Q: Can I customize the document styling?**
A: Custom styling options are planned for a future release. Current styling is optimized for professional reports.

**Q: What's the maximum file size for exports?**
A: Depends on system memory. We recommend keeping exports under 10,000 rows for optimal performance.

**Q: Can I schedule automated exports?**
A: Not directly, but you can use VS Code tasks or external schedulers to trigger the extension via command line.

---

## 🎉 Acknowledgments

- **[SQL Tools](https://vscode-sqltools.mteixeira.dev/)** - For excellent database integration
- **[docx](https://www.npmjs.com/package/docx)** - For powerful DOCX generation
- **[mssql](https://www.npmjs.com/package/mssql)** - For robust SQL Server connectivity
- **VS Code Team** - For the amazing extension API

---

## 📊 Roadmap

### Version 1.1 (Q1 2025)
- [ ] Excel export support
- [ ] PDF export support
- [ ] Custom document templates
- [ ] Query result caching

### Version 1.2 (Q2 2025)
- [ ] PostgreSQL support
- [ ] MySQL support
- [ ] Chart generation from results
- [ ] Email results directly

### Version 2.0 (Q3 2025)
- [ ] Scheduled exports
- [ ] Multi-database queries
- [ ] Result comparison
- [ ] Advanced formatting options

---

<p align="center">
  Made with ❤️ by developers, for developers
</p>

<p align="center">
  ⭐ Star us on GitHub if you find this helpful!
</p>