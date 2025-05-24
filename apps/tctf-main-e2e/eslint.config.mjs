import eslint from "@eslint/js";
import cypress from "eslint-plugin-cypress/flat";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import baseConfig from "../../eslint.config.mjs";

export default [
  cypress.configs["recommended"],
  ...baseConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...prettierConfig.rules,
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          trailingComma: "all",
          printWidth: 100,
          tabWidth: 2,
          semi: true,
        },
      ],
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
    },
  },
];
