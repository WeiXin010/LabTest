import globals from "globals";
import pluginJs from "@eslint/js";
import pluginSecurity from "eslint-plugin-security";
import pluginSecurityNode from "eslint-plugin-security-node";
import pluginUnsantized from "eslint-plugin-no-unsanitized";
import pluginReact from "eslint-plugin-react";
import parserBabel from "@babel/eslint-parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parser: parserBabel,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        requireConfigFile: false,
      },
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      security: pluginSecurity,
      "security-node": pluginSecurityNode,
      "no-unsanitized": pluginUnsantized,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginSecurity.configs.recommended.rules,
      ...pluginSecurityNode.configs.recommended.rules,
      ...pluginUnsantized.configs.recommended.rules,
      "security/detect-eval-with-expression": "error",
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/jsx-uses-react": "off",     // Not needed in React 17+
    },
  },
];
