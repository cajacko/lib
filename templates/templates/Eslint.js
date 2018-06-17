const TemplateBase = require('./TemplateBase');
const { MAX_LINE_LENGTH } = require('../config/constants');

const eslintConfig = {
  extends: ['airbnb'],
  rules: {
    'flowtype/define-flow-type': 1,
    'flowtype/use-flow-type': 1,
    'flowtype/require-valid-file-annotation': [2, 'always'],
    'func-names': 'off',
    'no-warning-comments': ['error', { location: 'anywhere' }],
    'no-console': 'error',
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'import/prefer-default-export': 'off',
    'valid-jsdoc': 'error',
    'require-jsdoc': [
      'warn',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
          ArrowFunctionExpression: true,
        },
      },
    ],
    'max-lines': [
      'error',
      {
        max: 150,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-len': [
      'error',
      {
        code: MAX_LINE_LENGTH,
        ignoreStrings: true,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'class-methods-use-this': 'off',
  },
  plugins: ['jest', 'flowtype'],
  env: {
    'jest/globals': true,
  },
  globals: {
    fetch: false,
    document: false,
    window: false,
    Image: false,
  },
};

class Eslint extends TemplateBase {
  define() {
    return this.writeJSON(eslintConfig, '.eslintrc');
  }
}

module.exports = Eslint;
