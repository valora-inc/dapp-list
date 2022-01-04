module.exports = {
  extends: ['@valora/eslint-config-typescript', 'plugin:json/recommended'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-console': ['error', { allow: ['none'] }]
  }
}
