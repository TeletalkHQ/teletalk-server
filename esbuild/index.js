const esbuild = require("esbuild");

esbuild.build({
  allowOverwrite: true,
  bundle: true,
  entryPoints: ["./src/servers/index.js"],
  minify: true,
  outfile: "build/index.js",
  platform: "node",
  target: "node16.0",
});

esbuild.build({
  allowOverwrite: true,
  bundle: true,
  entryPoints: ["./test/index.js"],
  minify: true,
  outfile: "build/test.js",
  platform: "node",
  target: "node16.0",
});
