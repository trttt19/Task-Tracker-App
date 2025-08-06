import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
    , extends: ["js/recommended"]
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, ...globals.jest }
    }
  },
  pluginReact.configs.flat.recommended,
]);
