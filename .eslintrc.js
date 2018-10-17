module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'eqeqeq': 'off',
    'no-multi-spaces': 'off',
    "key-spacing": ["error", {
      "align": "colon"
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
