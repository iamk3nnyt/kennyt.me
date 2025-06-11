import { FlatCompat } from "@eslint/eslintrc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      // Enable all jsx-a11y rules as errors
      ...Object.fromEntries(
        Object.keys(jsxA11y.rules)
          .filter(
            (rule) =>
              rule !== "label-has-for" &&
              rule !== "accessible-emoji" &&
              rule !== "label-has-associated-control" &&
              rule !== "control-has-associated-label",
          )
          .map((rule) => [`jsx-a11y/${rule}`, "error"]),
      ),
    },
  },
  eslintPluginPrettierRecommended,
];

export default eslintConfig;
