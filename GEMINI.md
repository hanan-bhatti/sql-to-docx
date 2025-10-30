# Gemini Code Assistant Context

## Project Overview

This project is a Visual Studio Code extension named **SQL to DOCX Exporter**. Its primary purpose is to execute SQL queries against a Microsoft SQL Server database and export the results into a well-formatted DOCX file.

The extension is written in JavaScript and leverages the following key technologies:

*   **`vscode` API:** For integration with the Visual Studio Code environment (e.g., commands, UI elements, editor context).
*   **`mssql`:** A Node.js library for connecting to and querying Microsoft SQL Server.
*   **`docx`:** A Node.js library for creating and manipulating DOCX files.
*   **`webpack`:** For bundling the extension's source code.

The extension's entry point is `extension.js`, which contains the main `SQLToDocxExtension` class that encapsulates the extension's logic.

## Building and Running

### Prerequisites

*   Node.js and npm
*   Visual Studio Code

### Key Commands

The following npm scripts are defined in `package.json`:

*   **`npm install`**: Installs the project dependencies.
*   **`npm run lint`**: Lints the codebase using ESLint.
*   **`npm test`**: Runs the tests (currently a placeholder).
*   **`npm run package`**: Bundles the extension for production using webpack. This creates a VSIX installer file.
*   **`npm run compile`**: Compiles the extension using webpack.
*   **`npm run watch`**: Compiles the extension in watch mode, automatically recompiling on file changes.

### Running in Development

1.  Run `npm install` to install dependencies.
2.  Open the project in Visual Studio Code.
3.  Press `F5` to open a new Extension Development Host window with the extension loaded.

## Development Conventions

### Coding Style

The project uses ESLint for code linting. The configuration can be found in `.eslintrc.js`. The rules enforce a consistent coding style and help prevent common errors.

### Contribution Guidelines

The `CONTRIBUTING.md` file outlines the process for contributing to the project, including how to report bugs, request features, and submit pull requests.

### Testing

The project has a basic test setup, with the test runner defined in `test/runTest.js`. The tests can be run using the `npm test` command.
