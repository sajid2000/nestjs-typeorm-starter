/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["simple-import-sort", "prettier", "@typescript-eslint"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 130,
        endOfLine: "auto",
        semi: true,
        singleQuote: false,
        trailingComma: "es5",
        tabWidth: 2,
      },
    ],
    "no-empty-pattern": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "sort-imports": "off",
    "simple-import-sort/imports": [
      2,
      {
        groups: [
          ["@total-typescript/ts-reset"],
          [`^(${require("module").builtinModules.join("|")})(/|$)`],
          ["^@?\\w"],
          ["^@/\\w"],
          ["^\\."]
        ],
      },
    ],
  },
};
