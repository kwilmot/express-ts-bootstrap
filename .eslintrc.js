module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 'ES2020', // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        project: './tsconfig.json',
    },
    settings: {},
    extends: [
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
    env: {
        node: true,
    },
    ignorePatterns: ['dist', 'coverage', 'node_modules', 'docker'],
};
