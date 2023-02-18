/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      1,
      {
        singleQuote: true,
        parser: 'flow',
        trailingComma: 'none',
        semi: false
      }
    ],
    'vue/multi-word-component-names': 0
  }
}
