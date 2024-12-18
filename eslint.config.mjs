import antfu from "@antfu/eslint-config";

export default antfu(
  {
    react: true,
    stylistic: {
      indent: 2,
      quotes: "double",
    },
  },
  {
    rules: {
      "style/semi": ["error", "always"],
    },
  },
);
