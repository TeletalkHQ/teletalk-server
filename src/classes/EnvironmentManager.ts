class EnvironmentManager {
	getEnv() {
		return process.env;
	}

	getNodeEnv() {
		return this.getEnv().NODE_ENV;
	}
}

export const envManager = new EnvironmentManager();
