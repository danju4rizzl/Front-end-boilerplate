module.exports = {
  env: { browser: true, es6: true, node: true },
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  ignorePatterns: [".next"],
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      node: {
        paths: ["src"],
      },
    },
  },
  extends: [
    "plugin:@next/next/recommended",
    "eslint:recommended",
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier",
    "react-hooks",
    "jsx-a11y",
  ],
  rules: {
    "react/display-name": 0,
    "react/prop-types": 0,
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react-hooks/exhaustive-deps": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "no-restricted-imports": "off",
    "@next/next/no-img-element": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
