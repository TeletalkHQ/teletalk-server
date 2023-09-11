import dotenv from "dotenv";
import path from "path";

import { EnvFileName } from "~/types";

class EnvironmentManager {
	getEnv() {
		return process.env;
	}

	getNodeEnv() {
		return this.getEnv().NODE_ENV;
	}

	registerEnvironments(fileName: EnvFileName) {
		dotenv.config({
			path: path.join(
				process.cwd(),
				"environments",
				this.resolveEnvFileName(fileName)
			),
			override: true,
		});
	}

	private resolveEnvFileName(fileName: EnvFileName) {
		return `.env.${fileName}`;
	}
}

export const envManager = new EnvironmentManager();
