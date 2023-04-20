import { build } from "esbuild";

const defaultOptions = {
  allowOverwrite: true,
  bundle: true,
  minify: false,
  sourcemap: false,
  platform: "node",
  target: "esnext",
  banner: {
    js: `
        import { fileURLToPath } from 'url';
        import { createRequire as topLevelCreateRequire } from 'module';
        const require = topLevelCreateRequire(import.meta.url);
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        `,
  },
};

const appBuilder = (version) =>
  build({
    ...defaultOptions,
    entryPoints: ["src/servers/index.ts"],
    outfile: `build/${version[0]}/app.mjs`,
    target: version[1],
    tsconfig: "tsconfig.json",
    format: "esm",
  });

const testBuilder = (version) =>
  build({
    ...defaultOptions,
    entryPoints: ["testSrc/index.ts"],
    outfile: `build/${version[0]}/test.mjs`,
    target: version[1],
    tsconfig: "tsconfig.json",
    format: "esm",
  });

const calcNodeVersion = () => {
  return process.env.npm_config_user_agent
    ?.split("node/v")[1]
    ?.split(" ")[0]
    ?.slice(0, 2);
};

const NODE_VERSION = calcNodeVersion();

const targets = {
  default: "node18.0",
  node16: "node16.0",
  node18: "node18.0",
  node20: "node20.0",
  [`node${NODE_VERSION}`]: `node${NODE_VERSION}.0`,
};

Object.entries(targets).forEach(appBuilder);
Object.entries(targets).forEach(testBuilder);
