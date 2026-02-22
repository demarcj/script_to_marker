const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["./index.ts"],
  bundle: true,
  outfile: "jsx/hostscript.jsx",

  platform: "neutral",
  target: ["es5"],

  format: "cjs",

  treeShaking: false,

  minify: false,
}).catch(() => process.exit(1));
