# Project Structure

Complete file structure for the SQL to DOCX Exporter VS Code Extension.

```
sql-to-docx/
│
├── 📄 extension.js                 # Main extension entry point (5,000+ lines)
│   ├── Class: SQLToDocxExtension
│   ├── Methods: 
│   │   ├── checkSQLToolsInstalled()
│   │   ├── checkSQLServerRunning()
│   │   ├── getSQLToolsConnection()
│   │   ├── connect()
│   │   ├── parseQueries()
│   │   ├── executeQuery()
│   │   ├── createDocumentSections()
│   │   ├── saveDocument()
│   │   ├── runAllQueries()
│   │   └── runSelectedQuery()
│   └── Functions: activate(), deactivate()
│
├── 📦 package.json                 # Extension manifest & dependencies
│   ├── Extension metadata
│   ├── Commands definitions
│   ├── Menus & keybindings
│   ├── Configuration schema
│   └── Dependencies (mssql, docx)
│
├── 📖 README.md                    # Comprehensive documentation (500+ lines)
│   ├── Features overview
│   ├── Installation guide
│   ├── Usage instructions
│   ├── Configuration options
│   ├── Troubleshooting
│   └── Examples
│
├── 📋 CHANGELOG.md                 # Version history
│   ├── Version 1.0.0 details
│   ├── Feature list
│   └── Future roadmap
│
├── 🤝 CONTRIBUTING.md              # Contribution guidelines (800+ lines)
│   ├── Code of conduct
│   ├── Development setup
│   ├── Coding standards
│   ├── Testing guidelines
│   ├── Commit message format
│   └── PR process
│
├── 🚀 SETUP_GUIDE.md              # Step-by-step setup (600+ lines)
│   ├── Prerequisites
│   ├── Quick start (5 min)
│   ├── Configuration
│   ├── Troubleshooting
│   └── Advanced setup
│
├── 📜 LICENSE                      # MIT License
│
├── 🔧 Configuration Files
│   ├── .gitignore                 # Git ignore rules
│   ├── .vscodeignore             # VS Code package exclusions
│   ├── .eslintrc.js              # ESLint configuration
│   └── webpack.config.js         # Webpack bundling config
│
├── 📁 .vscode/                    # VS Code workspace settings
│   ├── launch.json               # Debug configurations
│   ├── tasks.json                # Build tasks
│   └── settings.json             # Workspace settings
│
├── 📁 images/                     # Extension assets
│   ├── icon.png                  # Extension icon (128x128)
│   ├── logo.png                  # Marketing logo
│   └── screenshots/              # Feature screenshots
│       ├── main-feature.png
│       ├── context-menu.png
│       ├── document-output.png
│       └── settings.png
│
├── 📁 test/                       # Test files
│   ├── suite/
│   │   ├── extension.test.js     # Extension tests
│   │   ├── parser.test.js        # Query parser tests
│   │   └── document.test.js      # Document generation tests
│   ├── runTest.js                # Test runner
│   └── fixtures/                 # Test fixtures
│       └── sample.sql
│
├── 📁 docs/                       # Additional documentation
│   ├── API.md                    # API documentation
│   ├── ARCHITECTURE.md           # Architecture overview
│   ├── TROUBLESHOOTING.md        # Detailed troubleshooting
│   └── EXAMPLES.md               # Usage examples
│
├── 📁 examples/                   # Example SQL files
│   ├── basic-queries.sql
│   ├── complex-joins.sql
│   ├── stored-procedures.sql
│   └── sample-output.docx
│
└── 📁 dist/                       # Build output (generated)
    └── extension.js              # Bundled extension

```

## File Details

### Core Files

#### `extension.js` (Main Extension)
- **Lines**: ~500
- **Purpose**: Core extension logic
- **Key Components**:
  - `SQLToDocxExtension` class
  - Command handlers
  - Query execution engine
  - Document generation
  - Error handling
  - Logging system

#### `package.json` (Manifest)
- **Lines**: ~150
- **Purpose**: Extension configuration
- **Sections**:
  - Metadata (name, version, publisher)
  - Activation events
  - Commands & menus
  - Keyboard shortcuts
  - Configuration schema
  - Dependencies

### Documentation Files

#### `README.md`
- **Lines**: ~500
- **Sections**:
  - Overview with badges
  - Features list
  - Installation methods
  - Usage guide
  - Configuration
  - Troubleshooting
  - Examples
  - Support info

#### `SETUP_GUIDE.md`
- **Lines**: ~600
- **Focus**: Getting started
- **Sections**:
  - Prerequisites checklist
  - 5-minute quick start
  - Detailed configuration
  - Troubleshooting setup
  - Example workflows
  - Advanced setup

#### `CONTRIBUTING.md`
- **Lines**: ~800
- **Focus**: Developer contributions
- **Sections**:
  - Code of conduct
  - Development environment
  - Coding standards
  - Testing requirements
  - Git workflow
  - PR process

#### `CHANGELOG.md`
- **Lines**: ~200
- **Focus**: Version history
- **Sections**:
  - Version 1.0.0 features
  - Future roadmap
  - Breaking changes
  - Migration guides

### Configuration Files

#### `.eslintrc.js`
- **Purpose**: Code linting rules
- **Enforces**:
  - ES6+ syntax
  - 2-space indentation
  - Single quotes
  - No trailing spaces
  - Max line length (100)

#### `webpack.config.js`
- **Purpose**: Bundle extension
- **Configuration**:
  - Target: Node.js
  - Entry: extension.js
  - Output: dist/extension.js
  - Externals: vscode

#### `.gitignore`
- **Purpose**: Git exclusions
- **Ignores**:
  - node_modules/
  - *.vsix
  - dist/
  - logs/

#### `.vscodeignore`
- **Purpose**: Package exclusions
- **Excludes**:
  - Test files
  - Source maps
  - Documentation (except README)
  - Development configs

### VS Code Workspace

#### `.vscode/launch.json`
- **Configurations**:
  - Run Extension (F5)
  - Run Tests
  - Run without debugging

#### `.vscode/tasks.json` (optional)
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "npm",
      "script": "compile",
      "group": "build"
    }
  ]
}
```

## Build Process

### Development
```bash
npm install          # Install dependencies
npm run compile      # Compile TypeScript (if used)
npm run watch        # Watch mode
```

### Testing
```bash
npm run lint         # Run ESLint
npm test            # Run tests
```

### Packaging
```bash
npm run package      # Create .vsix file
```

### Publishing
```bash
vsce publish         # Publish to marketplace
```

## Size Metrics

### Extension Package
- **Total Size**: ~5 MB (with node_modules bundled)
- **Core Code**: ~100 KB
- **Dependencies**: ~4.9 MB
  - mssql: ~2 MB
  - docx: ~2.5 MB
  - Other: ~400 KB

### Installation Size
- **Compressed (.vsix)**: ~1.5 MB
- **Installed**: ~5 MB

## Dependencies

### Production
```json
{
  "mssql": "^10.0.1",          // SQL Server connectivity
  "docx": "^8.5.0"             // DOCX generation
}
```

### Development
```json
{
  "@types/vscode": "^1.80.0",
  "@types/node": "^20.0.0",
  "@vscode/test-electron": "^2.3.0",
  "eslint": "^8.50.0",
  "webpack": "^5.88.0",
  "webpack-cli": "^5.1.4"
}
```

## Extension Dependencies
```json
{
  "mtxr.sqltools": ">=0.28.0",
  "mtxr.sqltools-driver-mssql": ">=0.5.0"
}
```

## API Surface

### Commands
- `sqlToDocx.runAllQueries` - Export all queries
- `sqlToDocx.runSelectedQuery` - Export selected query
- `sqlToDocx.showOutput` - Show output channel

### Configuration
- `sqlToDocx.maxRows` - Max rows per query (default: 10)
- `sqlToDocx.autoAppend` - Auto append mode (default: true)
- `sqlToDocx.showOutputOnError` - Show output on error (default: true)
- `sqlToDocx.dateFormat` - Date format (default: YYYY-MM-DD)
- `sqlToDocx.checkSQLServerStatus` - Check SQL Server (default: true)

## Development Workflow

### Initial Setup
1. Clone repository
2. Run `npm install`
3. Open in VS Code
4. Press F5 to debug

### Adding Features
1. Create feature branch
2. Modify `extension.js`
3. Update `package.json` if adding commands
4. Add tests in `test/`
5. Update documentation
6. Run tests
7. Create PR

### Testing Changes
1. Press F5 in VS Code
2. Extension Development Host opens
3. Test functionality
4. Check output channel
5. Verify document generation

### Release Process
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run `npm run package`
4. Test .vsix installation
5. Tag release in Git
6. Publish to marketplace

## Common Tasks

### Add New Command
1. Add to `package.json`:
   ```json
   {
     "command": "sqlToDocx.newCommand",
     "title": "New Command"
   }
   ```
2. Register in `extension.js`:
   ```javascript
   context.subscriptions.push(
     vscode.commands.registerCommand('sqlToDocx.newCommand', handler)
   );
   ```

### Add Configuration
1. Add to `package.json`:
   ```json
   "sqlToDocx.newSetting": {
     "type": "boolean",
     "default": true,
     "description": "New setting"
   }
   ```
2. Access in code:
   ```javascript
   const config = vscode.workspace.getConfiguration('sqlToDocx');
   const value = config.get('newSetting');
   ```

### Add Menu Item
1. Add to `package.json`:
   ```json
   "menus": {
     "editor/context": [
       {
         "command": "sqlToDocx.newCommand",
         "group": "sqlToDocx@3"
       }
     ]
   }
   ```

## Maintenance

### Weekly
- Review issues
- Respond to PRs
- Check dependencies

### Monthly
- Update dependencies
- Review roadmap
- Plan releases

### Quarterly
- Major version planning
- Documentation review
- Performance optimization

---

For more information:
- Development: See [CONTRIBUTING.md](CONTRIBUTING.md)
- Setup: See [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Features: See [README.md](README.md)