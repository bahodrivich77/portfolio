import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
export default defineConfig([
  { ignores: ["dist/**", "node_modules/**", ".vite/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx,js}"],
    languageOptions: { globals: globals.browser },
    plugins: { "react-hooks": reactHooks },
    rules: { ...reactHooks.configs.recommended.rules },
  },
  {
    files: ["api/**/*.js", "scripts/**/*.mjs", "*.config.js"],
    languageOptions: { globals: globals.node },
  },
]);
