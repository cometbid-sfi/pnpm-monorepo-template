import eslint from "@eslint/js";
import * as prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import * as parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

const { default: prettier } = prettierPlugin;

export default [
  eslint.configs.recommended,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/coverage/**",
      "eslint.config.mjs",
      "next.config.js"
    ]
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      "prettier": prettier
    },
    languageOptions: {
      parser: parser.default,
      parserOptions: {
        project: "./tsconfig.eslint.json", // Update this line
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module"
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
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unsafe-assignment": "error"
    }
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: {
        ...globals.node
      }
    },
    ...eslint.configs.recommended,
    plugins: {
      "prettier": prettier
    },
    rules: {
      ...eslint.configs.recommended.rules,
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