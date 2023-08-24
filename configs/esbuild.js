import { build } from "esbuild";

const defaultOptions = {
	allowOverwrite: true,
	banner: {
		js: `
        import { fileURLToPath } from 'url';
        import { createRequire as topLevelCreateRequire } from 'module';
        const require = topLevelCreateRequire(import.meta.url);
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        `,
	},
	bundle: true,
	minify: false,
	platform: "node",
	sourcemap: false,
	target: "esnext",
};

const appBuilder = (version) =>
	build({
		...defaultOptions,
		entryPoints: ["src/index.ts"],
		outfile: `build/${version[0]}/app.mjs`,
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
