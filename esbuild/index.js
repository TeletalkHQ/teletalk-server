// eslint-disable-next-line @typescript-eslint/no-var-requires
const { build } = require("esbuild");

const defaultOptions = {
  allowOverwrite: true,
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: "node",
};

const appBuilder = ([key, value]) =>
  build({
    ...defaultOptions,
    entryPoints: ["./src/servers/index.ts"],
    outfile: `build/${key}/app.js`,
    target: value,
    // tsconfig: "./tsconfig.json",
  });

// const testBuilder = ([key, value]) =>
//   build({
//     ...defaultOptions,
//     entryPoints: ["./testSrc/index.js"],
//     outfile: `build/${key}/test.js`,
//     target: value,
//   });

const calcNodeVersion = () => {
  return process.env.npm_config_user_agent
    ?.split("node/v")[1]
    ?.split(" ")[0]
    ?.slice(0, 2);
};

const NODE_VERSION = calcNodeVersion();

const targets = {
  [`node${NODE_VERSION}`]: `node${NODE_VERSION}.0`,
  default: "node18.0",
  node14: "node14.0",
  node16: "node16.0",
  node18: "node18.0",
  node20: "node20.0",
};

Object.entries(targets).forEach(appBuilder);
// Object.entries(targets).forEach(testBuilder);
