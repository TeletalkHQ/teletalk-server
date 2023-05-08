import path from "path";

const NODE_ENV = process.env.NODE_ENV;

const getBuildFolderName = () => {
  const NODE_VERSION = process.env.NODE_VERSION || getNodeVersion();

  if (!NODE_VERSION) throw "Node version not supported!";

  return `node${NODE_VERSION.slice(0, 2)}`;
};
const getNodeVersion = () => {
  return process.env.npm_config_user_agent
    ?.split("node/v")[1]
    ?.split(" ")[0]
    ?.slice(0, 2);
};

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const start = async () => {
  try {
    if (isProduction()) return await runProduction();

    runDev();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const isProduction = () =>
  ["production", "production_local"].some((i) => i === NODE_ENV);

const runProduction = async () => {
  const appPath = path.join(
    __dirname,
    "build",
    getBuildFolderName(),
    "app.mjs"
  );
  const app = await import(appPath);

  console.log("app:", app);

  app.runner();
};

const runDev = async () => (await import(path.join(__dirname, "src"))).runner();

await start();
