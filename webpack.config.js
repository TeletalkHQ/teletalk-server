import { join } from "path";

import nodeExternals from "webpack-node-externals";

const srcPath = join(__dirname, "src");

export const externals = [nodeExternals()];
export const externalsPresets = {
  node: true,
};
export const mode = "development";
export const resolve = {
  alias: {
    "@": srcPath,
  },
};
export const target = "node";
