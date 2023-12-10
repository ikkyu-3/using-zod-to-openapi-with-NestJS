import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  target: ["es2022"],
  outDir: "./dist",
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
});
