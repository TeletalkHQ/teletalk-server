/* eslint-disable no-console */
import path from "path";

const NODE_ENV = process.env.NODE_ENV;

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const start = async () => {
  try {
    if (isProduction()) return await runProduction();

    runDev();
  } catch (error) {
    console.error("something bad happened during the initialization");
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

  app.runner();
};

const getBuildFolderName = () => {
  const { NODE_VERSION = getNodeVersion() } = process.env;

  if (!NODE_VERSION) throw "Node version not supported!";

  return `node${NODE_VERSION.slice(0, 2)}`;
};

const getNodeVersion = () => {
  return (
    process.env.npm_config_user_agent
      ?.split("node/v")[1]
      ?.split(" ")[0]
      ?.slice(0, 2) || "18"
  );
};

const runDev = async () => (await import(path.join(__dirname, "src"))).runner();

await start();
