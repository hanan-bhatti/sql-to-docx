# Setup Guide for SQL to DOCX Exporter

This guide will help you set up the SQL to DOCX Exporter extension from scratch.

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **VS Code** (v1.80.0 or higher) - [Download](https://code.visualstudio.com/)
- **Git** - [Download](https://git-scm.com/)
- **SQL Server** (any version) - [Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

## 🚀 Quick Start (5 minutes)

### Step 1: Install SQL Tools Extensions

1. Open VS Code
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
3. Search for "SQL Tools"
4. Install **SQL Tools** by Matheus Teixeira
5. Search for "SQL Tools MSSQL"
6. Install **SQL Tools MSSQL Driver** by Matheus Teixeira

### Step 2: Install SQL to DOCX Extension

**Option A: From Marketplace (when published)**
1. Search "SQL to DOCX" in Extensions
2. Click Install

**Option B: From VSIX File**
1. Download the `.vsix` file
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type "Install from VSIX"
4. Select the downloaded file

**Option C: Build from Source**
```bash
git clone https://github.com/your-username/sql-to-docx.git
cd sql-to-docx
npm install
npm run package
code --install-extension sql-to-docx-1.0.0.vsix
```

### Step 3: Configure SQL Server Connection

1. **Open SQL Tools Sidebar**
   - Click the database icon in the activity bar (left side)
   - Or press `Ctrl+Shift+D` then select "SQL Tools"

2. **Add New Connection**
   - Click "Add New Connection" button
   - Select "MSSQL" as driver

3. **Enter Connection Details**

   **For Local SQL Server (Windows Authentication):**
   ```
   Connection name: Local SQL Server
   Server: localhost
   Port: 1433 (default)
   Database: YourDatabaseName
   Authentication: Windows Authentication
   ```

   **For SQL Server (SQL Login):**
   ```
   Connection name: My Database
   Server: localhost (or server address)
   Port: 1433
   Database: YourDatabaseName
   Authentication: SQL Login
   Username: sa (or your username)
   Password: YourPassword
   ```

   **For SQL Server Express:**
   ```
   Connection name: SQL Express
   Server: localhost\SQLEXPRESS
   Port: 1433
   Database: YourDatabaseName
   Authentication: Windows Authentication
   ```

   **For Azure SQL:**
   ```
   Connection name: Azure SQL
   Server: yourserver.database.windows.net
   Port: 1433
   Database: YourDatabaseName
   Authentication: SQL Login
   Username: yourusername
   Password: yourpassword
   ```

4. **Test Connection**
   - Click "Test Connection" button
   - Should show "Successfully connected!"

5. **Save Connection**
   - Click "Save Connection"

### Step 4: Create Your First SQL File

1. **Create New File**
   - Press `Ctrl+N` (Windows/Linux) or `Cmd+N` (Mac)
   - Save as `my_queries.sql`

2. **Add Sample Queries**
   ```sql
   -- Query 1: Get all customers
   SELECT TOP 10 
       CustomerID,
       CustomerName,
       Email,
       City
   FROM Customers
   ORDER BY CustomerID;

   -- Query 2: Get order summary
   SELECT 
       COUNT(*) AS TotalOrders,
       SUM(TotalAmount) AS Revenue,
       AVG(TotalAmount) AS AvgOrderValue
   FROM Orders
   WHERE OrderDate >= '2024-01-01';
   ```

3. **Save the File**

### Step 5: Run Your First Export

**Method 1: Export All Queries**
1. Press `Ctrl+Shift+E` (Windows/Linux) or `Cmd+Shift+E` (Mac)
2. Wait for execution to complete
3. Click "Open Document" to view results

**Method 2: Export Selected Query**
1. Select a specific query with your mouse
2. Right-click on the selection
3. Choose "SQL to DOCX: Export Selected Query"
4. View the results

## 🔧 Configuration

### Adjust Settings

1. **Open Settings**
   - Press `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac)
   - Search "SQL to DOCX"

2. **Common Settings to Adjust**

   ```json
   {
     "sqlToDocx.maxRows": 10,
     "sqlToDocx.autoAppend": true,
     "sqlToDocx.dateFormat": "YYYY-MM-DD",
     "sqlToDocx.showOutputOnError": true
   }
   ```

### Keyboard Shortcuts

Default shortcuts:
- **Export All Queries**: `Ctrl+Shift+E` (Windows/Linux), `Cmd+Shift+E` (Mac)
- **Export Selected**: `Ctrl+Shift+R` (Windows/Linux), `Cmd+Shift+R` (Mac)

To customize:
1. Press `Ctrl+K Ctrl+S`
2. Search "SQL to DOCX"
3. Click the pencil icon to change

## 🐛 Troubleshooting Setup

### SQL Server Not Connecting

**Windows:**
```cmd
# Check if SQL Server is running
sc query MSSQLSERVER

# Start SQL Server if stopped
net start MSSQLSERVER
```

**SQL Server Configuration Manager:**
1. Open SQL Server Configuration Manager
2. Go to "SQL Server Services"
3. Ensure "SQL Server (MSSQLSERVER)" is running
4. Go to "SQL Server Network Configuration"
5. Enable "TCP/IP" protocol
6. Restart SQL Server service

### SQL Tools Not Found

If you get "SQL Tools extension is required":

1. Check installed extensions:
   - Press `Ctrl+Shift+X`
   - Look for "SQL Tools" and "SQL Tools MSSQL Driver"

2. If not installed, search and install both

3. Reload VS Code:
   - Press `Ctrl+Shift+P`
   - Type "Developer: Reload Window"

### Connection Failed

**Check Connection String:**
- Verify server name (use `localhost` for local)
- Check database exists
- Verify credentials
- Ensure SQL Server is running

**Check Firewall:**
- Windows Firewall may block port 1433
- Add exception for SQL Server

**Enable TCP/IP:**
1. Open SQL Server Configuration Manager
2. SQL Server Network Configuration → Protocols
3. Right-click TCP/IP → Enable
4. Restart SQL Server

### Extension Not Activating

1. **Check file type**: Must be `.sql` file
2. **Reload window**: `Ctrl+Shift+P` → "Reload Window"
3. **Check output**: `Ctrl+Shift+P` → "SQL to DOCX: Show Output"
4. **Reinstall extension** if needed

## 📊 Example Workflow

### Daily Reporting Workflow

1. **Morning: Create Daily Report**
   ```sql
   -- File: daily_report.sql
   
   -- Today's sales
   SELECT COUNT(*) AS Orders, SUM(Total) AS Revenue
   FROM Orders
   WHERE OrderDate = CAST(GETDATE() AS DATE);
   
   -- Top products
   SELECT TOP 5 ProductName, SUM(Quantity) AS Sold
   FROM OrderDetails
   WHERE OrderDate = CAST(GETDATE() AS DATE)
   GROUP BY ProductName
   ORDER BY Sold DESC;
   ```

2. **Run Export**
   - Press `Ctrl+Shift+E`
   - Document created: `daily_report_results.docx`

3. **Add More Data**
   - Add new queries to the file
   - Press `Ctrl+Shift+E` again
   - Results are appended to existing document

4. **Share Report**
   - Document automatically includes all results
   - Share via email or network drive

### Ad-Hoc Analysis Workflow

1. **Write investigation query**
2. **Select the query**
3. **Right-click → Export Selected Query**
4. **Review results in document**
5. **Refine query and re-run**
6. **Results append to document showing progression**

## 🔐 Security Best Practices

### Connection Security

1. **Never hardcode credentials**
   - Use SQL Tools connection manager
   - Store connections securely

2. **Use Windows Authentication when possible**
   - More secure than SQL Login
   - No password management needed

3. **Limit permissions**
   - Use read-only accounts for reporting
   - Grant minimum necessary permissions

### Document Security

1. **Sensitive data**
   - Be cautious when exporting sensitive information
   - Consider who will have access to the documents

2. **File storage**
   - Store documents in secure locations
   - Use encryption for sensitive exports

## 📞 Getting Help

If you encounter issues:

1. **Check Output Channel**
   - `Ctrl+Shift+P` → "SQL to DOCX: Show Output"
   - Look for error messages

2. **Review Logs**
   - Check for detailed error information
   - Note any error codes

3. **GitHub Issues**
   - Search existing issues: https://github.com/your-username/sql-to-docx/issues
   - Create new issue with:
     - Error message
     - Steps to reproduce
     - Environment details

4. **Documentation**
   - README.md - Feature overview
   - TROUBLESHOOTING.md - Common issues
   - CONTRIBUTING.md - Development setup

## 🎓 Next Steps

Now that you're set up:

1. **Explore features**
   - Try different query types
   - Test with various data types
   - Experiment with multiple queries

2. **Customize settings**
   - Adjust `maxRows` for your needs
   - Configure date formats
   - Set up keyboard shortcuts

3. **Share with team**
   - Document your use cases
   - Create query templates
   - Establish reporting workflows

4. **Provide feedback**
   - Report bugs
   - Suggest features
   - Share your workflows

## 🚀 Advanced Setup

### Multi-Environment Setup

Configure connections for different environments:

```json
// settings.json
{
  "sqltools.connections": [
    {
      "name": "DEV",
      "server": "dev-server",
      "database": "MyDB_Dev",
      "driver": "MSSQL"
    },
    {
      "name": "TEST",
      "server": "test-server",
      "database": "MyDB_Test",
      "driver": "MSSQL"
    },
    {
      "name": "PROD (Read-Only)",
      "server": "prod-server",
      "database": "MyDB_Prod",
      "driver": "MSSQL"
    }
  ]
}
```

### Workspace Setup

For team collaboration:

1. Create `.vscode/settings.json` in project root:
   ```json
   {
     "sqlToDocx.maxRows": 50,
     "sqlToDocx.autoAppend": true,
     "files.associations": {
       "*.sql": "sql"
     }
   }
   ```

2. Share with team via Git
3. Everyone gets consistent settings

---

**Congratulations!** 🎉 You're now ready to use SQL to DOCX Exporter!

For more information, see:
- [README.md](README.md) - Full documentation
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute