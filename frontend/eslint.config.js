// eslint.config.js (flat config)
import js from "@eslint/js"; // ESLint's built-in base rules
import globals from "globals"; // Common global variables (like window, document)
import pluginReact from "eslint-plugin-react"; // React-specific lint rules
import { defineConfig } from "eslint/config"; // Flat config helper
import pluginSecurity from "eslint-plugin-security";
import pluginSecurityNode from "eslint-plugin-security-node";
import pluginUnsantized from "eslint-plugin-no-unsanitized";

export default defineConfig([
  js.configs.recommended,             // ESLint core rules
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], // Apply to all JS/JSX files
    languageOptions: {
      parser: (await import("@babel/eslint-parser")).default, // Use Babel parser that supports JSX
      parserOptions: {
        requireConfigFile: false, // Don’t require a separate babel.config.js file
        babelOptions: {
          presets: ["@babel/preset-react"], // Enable React JSX syntax
        },
        ecmaVersion: 2020, // Enable modern JavaScript features
        sourceType: "module", // Support ESModules (i.e., `import/export`)
        ecmaFeatures: {
          jsx: true, // Explicitly enable JSX
        },
      },
      globals: globals.browser, // Enable browser globals like `window`, `document`
    },
    plugins: {
      js, // ESLint core rules
      react: pluginReact, // React plugin rules
      security: pluginSecurity,
      "security-node": pluginSecurityNode,
      "no-unsanitized": pluginUnsantized,
    },
    settings: {
      react: { version: "detect" }, // Auto-detect React version from package.json
    },
    rules: {
      // Start with recommended React rules
      ...pluginReact.configs.recommended.rules,
      ...js.configs.recommended.rules,
      ...pluginSecurity.configs.recommended.rules,
      ...pluginSecurityNode.configs.recommended.rules,
      ...pluginUnsantized.configs.recommended.rules,

      "security/detect-eval-with-expression": "error",
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/jsx-uses-react": "error", // Fix for older React versions to prevent unused React import warnings
      "react/jsx-uses-vars": "error", // Prevent "unused variable" for components
      "react/no-unused-prop-types": "warn", // Warn if you define props but don’t use them
      "react/prop-types": "warn", // Warn if you don’t define prop types (optional, if not using TypeScript)
      "no-console": "warn",
    },
  },
]);
