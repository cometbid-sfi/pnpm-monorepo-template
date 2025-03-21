import cypress from "eslint-plugin-cypress/flat";
import baseConfig from "../../eslint.config.mjs";

export default [
  cypress.configs["recommended"],
  ...baseConfig,
  {
    // Override or add rules here
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
