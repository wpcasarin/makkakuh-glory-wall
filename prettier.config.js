/** @type {import("prettier").Config} */
const config = {
  endOfLine: "lf",
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: "always",
  tailwindFunctions: ["clsx", "cn", "cva"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^react$",
    "",
    "<TYPES>",
    "<TYPES>^[.]",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^(@)(/.*)$",
    "",
    "^[.]",
  ],
};

export default config;
