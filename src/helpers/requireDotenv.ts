import path from "path";
import dotenv from "dotenv";

import { envManager } from "@/classes/EnvironmentManager";

const cwd = process.cwd();

dotenv.config({
  path: path.join(cwd, "environments", `${envManager.getNodeEnv()}.env`),
});
