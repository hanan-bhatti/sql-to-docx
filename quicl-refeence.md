# Quick Reference Guide

One-page reference for SQL to DOCX Exporter

## 🚀 Quick Actions

| Action | Shortcut (Win/Linux) | Shortcut (Mac) | Alternative |
|--------|---------------------|----------------|-------------|
| Export All Queries | `Ctrl+Shift+E` | `Cmd+Shift+E` | Command Palette → "Export All Queries" |
| Export Selected | `Ctrl+Shift+R` | `Cmd+Shift+R` | Right-click → "Export Selected Query" |
| Show Output | - | - | Command Palette → "Show Output" |

## 📋 Commands

| Command | Description |
|---------|-------------|
| `SQL to DOCX: Export All Queries` | Runs all queries in the file |
| `SQL to DOCX: Export Selected Query` | Runs only the selected query |
| `SQL to DOCX: Show Output` | Opens the extension log |

## ⚙️ Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `sqlToDocx.maxRows` | number | 10 | Max rows to export (1-1000) |
| `sqlToDocx.autoAppend` | boolean | true | Auto-append to existing docs |
| `sqlToDocx.showOutputOnError` | boolean | true | Show logs on errors |
| `sqlToDocx.dateFormat` | string | YYYY-MM-DD | Date format in exports |
| `sqlToDocx.checkSQLServerStatus` | boolean | true | Check SQL Server status |

## 🔗 Connection Setup

### Local SQL Server (Windows Auth)
```
Server: localhost
Database: YourDatabase
Authentication: Windows Authentication
```

### Local SQL Server (SQL Login)
```
Server: localhost
Database: YourDatabase
Authentication: SQL Login
Username: sa
Password: YourPassword
```

### SQL Server Express
```
Server: localhost\SQLEXPRESS
Database: YourDatabase
Authentication: Windows Authentication
```

### Azure SQL
```
Server: yourserver.database.windows.net
Database: YourDatabase
Username: yourusername
Password: yourpassword
```

## 📝 SQL File Format

```sql
-- Query 1: Description
SELECT Column1, Column2
FROM Table1
WHERE Condition = 'Value';

-- Query 2: Another Description
SELECT *
FROM Table2
ORDER BY Column1;

-- Query 3: Update Example
UPDATE Table3
SET Column = 'NewValue'
WHERE ID = 123;
```

**Important**: 
- End queries with semicolon (`;`)
- Don't use `GO` statements
- Comments are preserved in output

## 📄 Output Format

**File Name**: `{sql_filename}_results.docx`

**Location**: Same directory as SQL file

**Contents**:
1. Document title & timestamp
2. For each query:
   - Query number & SQL text
   - Results table (max N rows)
   - Success/error message
   - Total row count

## 🎨 Document Styling

- **Headers**: Blue background, white text
- **Data Rows**: Alternating gray/white
- **Query Text**: Monospace font (Consolas)
- **Success**: Green bold text
- **Errors**: Red bold text
- **Info**: Gray italic text

## 🔍 Common Workflows

### Daily Report
1. Create `daily_report.sql`
2. Write queries
3. Press `Ctrl+Shift+E`
4. Document created: `daily_report_results.docx`
5. Share document

### Ad-Hoc Query
1. Open SQL file
2. Select query
3. Right-click → "Export Selected Query"
4. Results append to document

### Iterative Analysis
1. Write initial query
2. Export and review
3. Refine query
4. Export again (appends)
5. Document shows progression

## ⚡ Troubleshooting Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Extension not activating | Ensure file is `.sql`, reload window (`Ctrl+Shift+P` → Reload) |
| SQL Tools not found | Install SQL Tools & SQL Tools MSSQL Driver |
| Cannot connect | Check SQL Server is running: `sc query MSSQLSERVER` |
| Queries not parsing | Ensure semicolons between queries, no `GO` statements |
| Document not created | Check file permissions, view output channel |
| Slow execution | Reduce `maxRows` setting, add `TOP` to queries |

## 🐛 Debug Commands

```bash
# Windows: Check SQL Server status
sc query MSSQLSERVER

# Windows: Start SQL Server
net start MSSQLSERVER

# Test connection (in VS Code)
SQL Tools → Test Connection

# View logs
Command Palette → "SQL to DOCX: Show Output"
```

## 📦 File Locations

| Item | Location |
|------|----------|
| Output DOCX | Same directory as `.sql` file |
| Logs | VS Code Output Channel |
| Settings | `.vscode/settings.json` or User Settings |
| Connections | SQL Tools connection manager |
| Backups | Same directory, named `{file}_backup_{timestamp}.docx` |

## 🔐 Security Checklist

- [ ] Use read-only database accounts
- [ ] Never hardcode credentials in SQL files
- [ ] Store connections in SQL Tools securely
- [ ] Review exported data before sharing
- [ ] Use Windows Auth when possible
- [ ] Limit `maxRows` for sensitive data

## 📊 Performance Tips

1. **Add TOP clause** to limit results at database level
2. **Reduce maxRows** in settings
3. **Use specific columns** instead of `SELECT *`
4. **Add WHERE clauses** to filter data
5. **Export one query** at a time for large datasets
6. **Close other applications** for memory-intensive exports

## 🎯 Best Practices

### Query Writing
✅ Use clear comments
✅ End with semicolons
✅ Use TOP for large tables
✅ Add meaningful aliases
✅ Format for readability

❌ Don't use GO statements
❌ Don't hardcode credentials
❌ Avoid SELECT * on large tables
❌ Don't export without limits

### Document Management
✅ Use descriptive SQL filenames
✅ Review documents before sharing
✅ Keep backups of important exports
✅ Use append mode for iterations

❌ Don't overwrite without reviewing
❌ Don't share without checking content
❌ Don't export sensitive data unnecessarily

## 📞 Getting Help

| Resource | How to Access |
|----------|---------------|
| Output Logs | `Ctrl+Shift+P` → "SQL to DOCX: Show Output" |
| Documentation | [README.md](README.md) |
| Setup Guide | [SETUP_GUIDE.md](SETUP_GUIDE.md) |
| Issues | GitHub Issues |
| Discussions | GitHub Discussions |

## 🔄 Update Extension

### From Marketplace
1. Extensions panel
2. Find "SQL to DOCX"
3. Click "Update"

### Manual Update
1. Download new `.vsix`
2. Uninstall old version
3. Install new `.vsix`

## 📝 Configuration Examples

### Minimal Setup
```json
{
  "sqlToDocx.maxRows": 10
}
```

### Production Setup
```json
{
  "sqlToDocx.maxRows": 50,
  "sqlToDocx.autoAppend": true,
  "sqlToDocx.dateFormat": "MM/DD/YYYY",
  "sqlToDocx.showOutputOnError": true
}
```

### Development Setup
```json
{
  "sqlToDocx.maxRows": 5,
  "sqlToDocx.autoAppend": false,
  "sqlToDocx.showOutputOnError": true,
  "sqlToDocx.checkSQLServerStatus": false
}
```

## 🎓 Learning Resources

1. **README.md** - Full feature documentation
2. **SETUP_GUIDE.md** - Step-by-step setup
3. **EXAMPLES/** - Sample SQL files
4. **Output Channel** - Real-time logging
5. **GitHub Discussions** - Community Q&A

## 🚀 Version Info

Current Version: **1.0.0**

Minimum Requirements:
- VS Code: 1.80.0+
- Node.js: 16+
- SQL Server: 2012+ or Azure SQL

Dependencies:
- SQL Tools
- SQL Tools MSSQL Driver

---

**Pro Tip**: Add this to your VS Code keybindings for even faster access:

```json
{
  "key": "ctrl+alt+e",
  "command": "sqlToDocx.runAllQueries",
  "when": "editorLangId == sql"
}
```

Print or bookmark this page for quick reference! 📌