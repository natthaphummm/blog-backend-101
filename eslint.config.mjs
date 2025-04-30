import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    {
        files: ['./src/**/*.ts'],
        ignores: ['./src/generated/**/**/*.ts'],
        languageOptions: {
            parser: tsparser,
            sourceType: 'module',
        },

        plugins: {
            '@typescript-eslint': tseslint,
            prettier: prettierPlugin,
        },

        rules: {
            ...tseslint.configs.recommended.rules,
            ...prettierConfig.rules,
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            semi: ['error', 'always'],
            quotes: ['error', 'single'],
            'prettier/prettier': 'error',
        },
    },
];
