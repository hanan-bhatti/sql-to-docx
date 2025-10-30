# Changelog

All notable changes to the "SQL to DOCX Exporter" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-29

### Added
- 🎉 Initial release of SQL to DOCX Exporter
- ✨ Execute all queries in SQL file with single command
- ✨ Execute selected query via context menu or keyboard shortcut
- 📄 Beautiful DOCX document generation with professional styling
- 🔄 Automatic append mode for incremental documentation
- 📊 Top N rows export with configurable limit
- 🎨 Alternating row colors in result tables
- 🔍 Intelligent SQL query parsing
- ✅ Prerequisite checking (SQL Tools, SQL Server status)
- 🔐 Integration with SQL Tools connection management
- 💾 Automatic document backup before overwrite
- 📝 Comprehensive output channel logging
- ⚡ Progress indicators for long-running operations
- ⌨️ Keyboard shortcuts (Ctrl+Shift+E, Ctrl+Shift+R)
- 🖱️ Editor toolbar integration
- 📋 Context menu integration
- ⚙️ Configurable settings for max rows, date format, etc.
- 🛡️ Robust error handling and display
- 📈 Result statistics (row counts, rows affected)
- 🎨 Professional document formatting with headers and styling
- 🔄 Status bar indicator for connection status

### Features in Detail

#### Query Execution
- Sequential execution of multiple queries from SQL file
- Selected query execution for targeted exports
- Support for complex SQL with strings, comments, and multi-line statements
- Automatic query parsing and validation

#### Document Generation
- Beautiful table layouts with auto-sized columns
- Blue headers with white text
- Alternating gray/white row colors
- Monospace font for SQL query display
- Timestamp tracking for appends
- Professional document structure

#### Safety & Reliability
- SQL Server status checking (Windows)
- SQL Tools extension dependency checking
- Connection validation before execution
- Error messages displayed in documents
- Automatic backup of existing documents
- Comprehensive logging system

#### User Experience
- Multiple ways to trigger exports (command palette, keyboard, context menu, toolbar)
- Progress notifications for long operations
- Quick access to generated documents
- Option to reveal in file explorer
- Clear success/error messages

### Configuration Options
- `sqlToDocx.maxRows`: Control result set size (default: 10)
- `sqlToDocx.autoAppend`: Automatic append behavior (default: true)
- `sqlToDocx.showOutputOnError`: Show logs on error (default: true)
- `sqlToDocx.dateFormat`: Date format in exports (default: YYYY-MM-DD)
- `sqlToDocx.checkSQLServerStatus`: SQL Server status check (default: true)

### Dependencies
- mssql@^10.0.1: SQL Server connectivity
- docx@^8.5.0: DOCX document generation
- VS Code@^1.80.0: VS Code API
- SQL Tools extension (required)
- SQL Tools MSSQL Driver (required)

### Platform Support
- Windows 10/11 (full support including SQL Server status checking)
- macOS 10.15+ (without service status checking)
- Linux Ubuntu 18.04+, Debian 10+, RHEL 7+ (without service status checking)

### Known Issues
- Query parsing may fail with unconventional SQL formatting
- GO statements not supported (use semicolons only)
- Document append creates new file (docx library limitation)
- Large result sets (>1000 rows) may cause performance issues

### Notes
- This is the first stable release
- Tested with SQL Server 2016, 2019, 2022, and Azure SQL
- Requires SQL Tools extensions to be installed
- Works best with properly formatted SQL files

---

## [Unreleased]

### Planned for 1.1.0
- Excel export support (XLSX)
- PDF export support
- Custom document templates
- Result caching for repeated queries
- Query execution history
- Support for stored procedures
- Parameter input for parameterized queries

### Under Consideration
- PostgreSQL database support
- MySQL database support
- Chart generation from numeric results
- Email results directly from extension
- Scheduled/automated exports
- Multi-database query support
- Advanced formatting options
- Dark mode document templates
- Custom table styling options
- Export to multiple formats simultaneously

---

## Version History

- **1.0.0** (2025-10-29) - Initial Release

---

## Upgrade Guide

### From Nothing to 1.0.0
This is the initial release. Follow installation instructions in README.md.

---

## Breaking Changes

None yet - this is the first release.

---

## Deprecations

None yet - this is the first release.

---

## Migration Notes

### Future Breaking Changes
We will maintain backward compatibility wherever possible. Any breaking changes will be:
1. Announced in advance
2. Documented in this changelog
3. Include migration guides
4. Follow semantic versioning

---

## Support

For issues, feature requests, or questions:
- GitHub Issues: https://github.com/your-username/sql-to-docx/issues
- Documentation: https://github.com/your-username/sql-to-docx/wiki
- Email: support@yourdomain.com