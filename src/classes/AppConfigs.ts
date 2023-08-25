import dotenv from "dotenv";
import { LoggerChalker } from "logger-chalker";
import path from "path";

import { envManager } from "~/classes/EnvironmentManager";
import { EnvFileName, Environments } from "~/types";

class AppConfigs {
	private ENVIRONMENTS: Environments;

	async setup() {
		this.registerCustomGlobals();
		this.registerEnvironments("base");
		this.registerEnvironments(envManager.getNodeEnv());

		this.setEnvironments(envManager.getEnv());
		this.setLogLevel();
	}

	setPort(port: number) {
		this.ENVIRONMENTS.PORT = port;
	}

	private setLogLevel() {
		logger.onAll();
	}

	private setEnvironments(e: Environments) {
		this.ENVIRONMENTS = e;
	}

	private registerCustomGlobals() {
		global.logger = new LoggerChalker();
	}

	private registerEnvironments(fileName: EnvFileName) {
		dotenv.config({
			path: path.join(process.cwd(), "environments", `${fileName}.env`),
			override: true,
		});
	}
	getConfigs() {
		//FIXME: All to optional
		return {
			APP: {
				CLIENT_SECRET: this.ENVIRONMENTS.CLIENT_SECRET,
				ENVIRONMENT: this.ENVIRONMENTS.NODE_ENV,
				HOSTNAME: "localhost",
				PORT: this.ENVIRONMENTS.CUSTOM_PORT || this.ENVIRONMENTS.PORT,
				SELF_EXEC: this.ENVIRONMENTS.SELF_EXEC,
			},
			DB: {
				MONGO_URI: this.ENVIRONMENTS.MONGO_URI,
				REDIS_HOST: this.ENVIRONMENTS.REDIS_HOST,
				REDIS_PASSWORD: this.ENVIRONMENTS.REDIS_PASSWORD,
				REDIS_PORT: this.ENVIRONMENTS.REDIS_PORT,
			},
			SMS_CLIENT: {
				SMS_PROVIDER_1_HOST: this.ENVIRONMENTS.SMS_PROVIDER_1_HOST,
				SMS_PROVIDER_1_ROUTE: this.ENVIRONMENTS.SMS_PROVIDER_1_ROUTE,
				SMS_PROVIDER_1_SENDER: this.ENVIRONMENTS.SMS_PROVIDER_1_SENDER,
				SMS_PROVIDER_1_SESSION: this.ENVIRONMENTS.SMS_PROVIDER_1_SESSION,
				SMS_PROVIDER_2_HOST: this.ENVIRONMENTS.SMS_PROVIDER_2_HOST,
				SMS_PROVIDER_2_REPORT_URL: this.ENVIRONMENTS.SMS_PROVIDER_2_REPORT_URL,
				SMS_PROVIDER_2_ROUTE: this.ENVIRONMENTS.SMS_PROVIDER_2_ROUTE,
				SMS_PROVIDER_2_SESSION: this.ENVIRONMENTS.SMS_PROVIDER_2_SESSION,
				SMS_PROVIDER_SELECTOR: this.ENVIRONMENTS.SMS_PROVIDER_SELECTOR,
			},
			TEST: {
				RUNNER: this.ENVIRONMENTS.TEST_RUNNER,
			},
		};
	}
}

export const appConfigs = new AppConfigs();
