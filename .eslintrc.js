module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "standard",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "warn",
    "no-console": "off",
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
};
