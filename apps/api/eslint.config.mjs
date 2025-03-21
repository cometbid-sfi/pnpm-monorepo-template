// @ts-check
import eslint from "@eslint/js";
import * as prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import * as parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

// Destructure the plugin from prettierPlugin
const { default: prettier } = prettierPlugin;

export default [
  {
    ignores: ["eslint.config.mjs", "dist/**", "node_modules/**"]
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier
    },
    languageOptions: {
      parser: parser.default,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": ["error", {
        "singleQuote": false,
        "trailingComma": "all",
        "printWidth": 100,
        "tabWidth": 2,
        "semi": true
      }],
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unsafe-assignment": "error"
    }
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    ...eslint.configs.recommended,
    plugins: {
      prettier
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": ["error", {
        "singleQuote": false,
        "trailingComma": "all",
        "printWidth": 100,
        "tabWidth": 2,
        "semi": true
      }],
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
    }
  }
];