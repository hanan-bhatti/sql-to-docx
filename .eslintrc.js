module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    // Possible Errors
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],

    // Best Practices
    'eqeqeq': ['error', 'always'],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-return-await': 'error',
    'require-await': 'warn',
    'no-throw-literal': 'error',

    // Style
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'max-len': ['warn', { 
      'code': 100, 
      'ignoreUrls': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true
    }],

    // ES6
    'arrow-spacing': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'warn',
    'prefer-template': 'warn',
    'template-curly-spacing': ['error', 'never']
  },
  globals: {
    // VS Code globals
    'vscode': 'readonly'
  }
};