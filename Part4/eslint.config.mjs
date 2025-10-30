import globals from 'globals'
import js from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import prettierConfig from './prettier.config.js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      eqeqeq: 'error',
      'no-console': 'off',
      'prettier/prettier': ['error', prettierConfig],
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', 'client/**'],
  },
]
