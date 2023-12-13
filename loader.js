import { isBuiltin } from "node:module";
import { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";
import resolveCallback from "resolve";
import { load, resolve as resolveTs } from "ts-node/esm";
import { createMatchPath, loadConfig } from "tsconfig-paths";

const resolveAsync = promisify(resolveCallback);
const tsExtensions = new Set([".tsx", ".ts", ".mts", ".cts"]);

const { absoluteBaseUrl, paths } = loadConfig();
const matchPath = createMatchPath(absoluteBaseUrl, paths);

async function resolve(specifier, ctx, defaultResolve) {
  const { parentURL = pathToFileURL(absoluteBaseUrl) } = ctx;

  if (isBuiltin(specifier)) {
    return defaultResolve(specifier, ctx);
  }

  if (specifier.startsWith("file://")) {
    specifier = fileURLToPath(specifier);
  }

  let url;
  try {
    const resolution = await resolveAsync(matchPath(specifier) || specifier, {
      basedir: dirname(fileURLToPath(parentURL)),
      extensions: [".js", ".json", ".node", ".mjs", ...tsExtensions],
    });
    url = pathToFileURL(resolution).href;
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      error.code = "ERR_MODULE_NOT_FOUND";
    }
    throw error;
  }

  return resolveTs(url, ctx, defaultResolve);
}

export { resolve, load };
