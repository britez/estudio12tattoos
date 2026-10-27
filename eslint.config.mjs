import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

/**
 * Flat config nativa de Next 16.
 *
 * No se usa `FlatCompat`: `eslint-config-next@16` ya exporta flat config, y
 * pasarla por el shim de compatibilidad revienta con
 * "Converting circular structure to JSON".
 */
const eslintConfig = [
  {
    // Codigo que no escribimos nosotros y no tiene sentido auditar:
    // - components/ui: primitivas de shadcn, se regeneran desde el CLI
    // - prismicio-types: lo genera Slice Machine
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "prismicio-types.d.ts",
      "components/ui/**",
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // El proyecto arrastra `any` de la integracion con Prismic y de los
      // componentes generados por v0. Queda como warning para no bloquear el
      // deploy, pero sigue visible para ir limpiandolo.
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
]

export default eslintConfig
