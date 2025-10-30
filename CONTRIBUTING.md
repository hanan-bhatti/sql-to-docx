# Contributing to SQL to DOCX Exporter

First off, thank you for considering contributing to SQL to DOCX Exporter! It's people like you that make this extension better for everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Pledge

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- VS Code (v1.80.0 or higher)
- Git
- SQL Server (for testing)
- SQL Tools extension installed

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sql-to-docx.git
   cd sql-to-docx
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/sql-to-docx.git
   ```

## 💻 Development Setup

### Install Dependencies

```bash
npm install
```

### Open in VS Code

```bash
code .
```

### Run Extension in Debug Mode

1. Press `F5` or select "Run > Start Debugging"
2. A new VS Code window will open with the extension loaded
3. Set breakpoints in your code as needed

### Build the Extension

```bash
npm run compile
```

### Package the Extension

```bash
npm run package
```

This creates a `.vsix` file you can install for testing.

## 🤝 How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When reporting a bug, include:**

- Clear, descriptive title
- Exact steps to reproduce
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Environment details:
  - VS Code version
  - Extension version
  - SQL Server version
  - Operating system
  - SQL Tools version

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Execute '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g., Windows 11]
 - VS Code Version: [e.g., 1.84.0]
 - Extension Version: [e.g., 1.0.0]
 - SQL Server Version: [e.g., 2019]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Features

Feature requests are welcome! Please provide:

- Clear, descriptive title
- Detailed description of the feature
- Use cases explaining why this would be useful
- Example of how it would work
- Alternative solutions you've considered

**Feature Request Template:**

```markdown
**Is your feature request related to a problem?**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of alternative solutions or features.

**Use Cases**
Explain how this feature would be used and why it's valuable.

**Additional context**
Add any other context or screenshots about the feature request.
```

### Contributing Code

1. **Find or create an issue** to discuss what you plan to do
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** following our coding standards
4. **Test thoroughly** - ensure existing tests pass and add new ones
5. **Commit your changes** with clear commit messages
6. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** against the `main` branch

## 📝 Coding Standards

### JavaScript Style Guide

We follow standard JavaScript conventions with these specifics:

#### General

- Use ES6+ features (const, let, arrow functions, etc.)
- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Maximum line length: 100 characters

#### Naming Conventions

```javascript
// Classes: PascalCase
class SQLToDocxExtension {}

// Functions/Methods: camelCase
function executeQuery() {}

// Constants: UPPER_SNAKE_CASE
const MAX_ROWS_DEFAULT = 10;

// Private methods: prefix with underscore
_privateMethod() {}

// Async functions: clearly indicate with async keyword
async function fetchData() {}
```

#### Comments

```javascript
/**
 * Multi-line JSDoc comments for functions
 * @param {string} query - The SQL query to execute
 * @param {number} maxRows - Maximum rows to return
 * @returns {Promise<Object>} Query results
 */
async function executeQuery(query, maxRows) {
  // Single-line comments for inline explanations
  const result = await connection.query(query);
  return result;
}
```

#### Error Handling

```javascript
// Always use try-catch for async operations
try {
  const result = await executeQuery(query);
  return result;
} catch (error) {
  this.log(`Error executing query: ${error.message}`);
  throw error; // Re-throw if caller should handle
}
```

#### Async/Await

```javascript
// Prefer async/await over promises
async function getData() {
  const data = await fetchData();
  return processData(data);
}

// Not this:
function getData() {
  return fetchData()
    .then(data => processData(data));
}
```

### VS Code Extension Best Practices

- Use `vscode.window.withProgress` for long operations
- Dispose resources properly in `deactivate()`
- Use output channels for logging
- Show user-friendly error messages
- Respect user settings and configuration
- Use activation events to minimize startup impact

### File Organization

```
sql-to-docx/
├── extension.js          # Main extension file
├── package.json          # Extension manifest
├── README.md            # Documentation
├── CHANGELOG.md         # Version history
├── CONTRIBUTING.md      # This file
├── LICENSE              # MIT License
├── .vscodeignore        # Files to exclude from package
├── .gitignore          # Git ignore rules
├── .eslintrc.js        # ESLint configuration
├── webpack.config.js   # Webpack configuration
├── images/             # Icons and screenshots
│   └── icon.png
├── test/               # Test files
│   └── extension.test.js
└── docs/               # Additional documentation
    └── api.md
```

## 🧪 Testing Guidelines

### Running Tests

```bash
npm test
```

### Writing Tests

- Place test files in `test/` directory
- Name test files: `*.test.js`
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies (SQL Server, file system)

**Example Test:**

```javascript
const assert = require('assert');
const vscode = require('vscode');

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Parse queries correctly', () => {
    const input = 'SELECT * FROM Users; SELECT * FROM Orders;';
    const expected = ['SELECT * FROM Users', 'SELECT * FROM Orders'];
    const actual = parseQueries(input);
    assert.deepStrictEqual(actual, expected);
  });

  test('Handle empty input', () => {
    const input = '';
    const expected = [];
    const actual = parseQueries(input);
    assert.deepStrictEqual(actual, expected);
  });
});
```

### Manual Testing Checklist

Before submitting a PR, manually test:

- [ ] Extension activates correctly
- [ ] SQL Tools detection works
- [ ] SQL Server connection succeeds
- [ ] All queries execute correctly
- [ ] Document is created with proper formatting
- [ ] Append mode works as expected
- [ ] Error handling displays user-friendly messages
- [ ] Keyboard shortcuts work
- [ ] Context menu appears
- [ ] Settings are respected
- [ ] Status bar updates correctly

## 📝 Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(export): add Excel export support

Implement XLSX export functionality using xlsx library.
Users can now export to both DOCX and XLSX formats.

Closes #42
```

```
fix(parser): handle semicolons in string literals

Previously, semicolons inside string literals would
incorrectly split queries. Updated regex to handle
quoted strings properly.

Fixes #38
```

```
docs(readme): update installation instructions

Add instructions for manual VSIX installation and
clarify SQL Tools dependency requirements.
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update documentation** if you've changed functionality
2. **Add tests** for new features or bug fixes
3. **Run all tests** and ensure they pass
4. **Update CHANGELOG.md** with your changes
5. **Ensure code follows** our style guidelines
6. **Rebase on latest main** to avoid merge conflicts

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Related Issue
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe how you tested your changes:
- [ ] Test case 1
- [ ] Test case 2

## Screenshots (if applicable)
Add screenshots to demonstrate the changes.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
```

### Review Process

1. **Automated checks** must pass (linting, tests)
2. **At least one maintainer** must review and approve
3. **All feedback** must be addressed
4. **No merge conflicts** with main branch
5. **Squash commits** if requested

### After Merge

- Your contribution will be included in the next release
- You'll be added to the contributors list
- The related issue will be automatically closed

## 🎯 Areas for Contribution

### High Priority

- Additional database support (PostgreSQL, MySQL)
- Excel export functionality
- PDF export functionality
- Performance optimizations
- Better error messages
- Improved documentation

### Medium Priority

- Custom document templates
- Chart generation from results
- Query result caching
- Scheduled exports
- Email integration

### Good First Issues

Look for issues labeled `good first issue` - these are great for newcomers:
- Documentation improvements
- Minor bug fixes
- UI/UX enhancements
- Additional examples
- Test coverage improvements

## 📞 Getting Help

- **Questions**: Open a discussion on GitHub
- **Bugs**: Open an issue
- **Chat**: Join our community chat (link)
- **Email**: maintainer@example.com

## 🙏 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Thanked in the README
- Given credit for their specific contributions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to SQL to DOCX Exporter! 🎉