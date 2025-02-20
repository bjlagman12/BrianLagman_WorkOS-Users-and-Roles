import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  configPrettier,
  {
    plugins: {
      prettier, // Adds Prettier as a plugin
    },
    rules: {
      "no-unused-vars": "error",
      "single-quote": ["error", "as-needed"],
      "no-duplicate-imports": "error",
      "prefer-const": "error",
      indent: ["error", 2],
      semi: ["error", "always"],
      quotes: ["error", "single"],
      "no-multi-spaces": "error",
      "space-in-parens": ["error", "never"],
      "space-before-function-paren": ["error", "never"],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-parens": ["error", "as-needed"],
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
    },
  },
];
