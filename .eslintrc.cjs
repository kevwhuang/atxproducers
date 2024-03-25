'use strict';

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['global.d.ts'],
    plugins: ['react-refresh'],
    env: {
        browser: true,
        es2022: true,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/ban-ts-comment': 2,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-inferrable-types': 2,
        'array-bracket-spacing': 2,
        'array-callback-return': 2,
        'arrow-parens': [2, 'as-needed'],
        'arrow-spacing': 2,
        'block-spacing': 2,
        'brace-style': 2,
        'camelcase': 2,
        'class-methods-use-this': 2,
        'comma-dangle': 0,
        'comma-spacing': 2,
        'comma-style': 2,
        'computed-property-spacing': 2,
        'default-param-last': 2,
        'dot-notation': 2,
        'eol-last': 2,
        'eqeqeq': 2,
        'func-call-spacing': 2,
        'func-style': [2, 'declaration', { 'allowArrowFunctions': true }],
        'function-paren-newline': 0,
        'generator-star-spacing': 2,
        'id-length': 0,
        'implicit-arrow-linebreak': 2,
        'import/extensions': 2,
        'import/first': 2,
        'import/no-mutable-exports': 2,
        'import/no-webpack-loader-syntax': 2,
        'import/prefer-default-export': 2,
        'indent': 2,
        'key-spacing': 2,
        'keyword-spacing': 2,
        'max-len': [2, { code: 100 }],
        'new-cap': [2, { newIsCapExceptionPattern: '^webkit' }],
        'newline-per-chained-call': [2, { ignoreChainWithDepth: 4 }],
        'no-array-constructor': 2,
        'no-case-declarations': 2,
        'no-confusing-arrow': 2,
        'no-console': 2,
        'no-const-assign': 2,
        'no-dupe-class-members': 2,
        'no-duplicate-imports': 2,
        'no-else-return': 2,
        'no-eval': 2,
        'no-iterator': 2,
        'no-loop-func': 2,
        'no-mixed-operators': 2,
        'no-multi-assign': 2,
        'no-multiple-empty-lines': 2,
        'no-nested-ternary': 2,
        'no-new-func': 2,
        'no-new-object': 2,
        'no-new-wrappers': 2,
        'no-param-reassign': 0,
        'no-plusplus': 0,
        'no-prototype-builtins': 2,
        'no-restricted-globals': 2,
        'no-restricted-properties': 2,
        'no-restricted-syntax': 2,
        'no-trailing-spaces': 2,
        'no-undef': 0,
        'no-underscore-dangle': 2,
        'no-unneeded-ternary': 2,
        'no-unsafe-optional-chaining': 2,
        'no-unused-vars': 2,
        'no-useless-constructor': 2,
        'no-useless-escape': 2,
        'no-var': 2,
        'no-whitespace-before-property': 2,
        'nonblock-statement-body-position': 2,
        'object-curly-newline': 2,
        'object-curly-spacing': [2, 'always'],
        'object-shorthand': 2,
        'one-var': [2, 'never'],
        'operator-linebreak': [2, 'before'],
        'padded-blocks': [2, 'never'],
        'prefer-arrow-callback': 2,
        'prefer-const': 2,
        'prefer-destructuring': [2, { array: false }],
        'prefer-object-spread': 2,
        'prefer-spread': 2,
        'prefer-template': 2,
        'quote-props': [2, 'as-needed'],
        'quotes': [2, 'single'],
        'radix': 2,
        'react-hooks/exhaustive-deps': 2,
        'semi': 2,
        'space-before-blocks': 2,
        'space-before-function-paren': [2, { anonymous: 'always', named: 'never' }],
        'space-in-parens': 2,
        'space-infix-ops': 2,
        'spaced-comment': 2,
        'template-curly-spacing': 2,
        'wrap-iife': 2,
    },
};
