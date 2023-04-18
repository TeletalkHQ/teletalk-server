import { Environments, NodeEnvValue } from "@/types";

class EnvironmentManager {
  getEnvironment(): Environments {
    //@ts-ignore
    return process.env;
  }

  getNodeEnv() {
    return this.getEnvironment().NODE_ENV as NodeEnvValue;
  }

  setEnvironment(envName: string, value: string | number | boolean) {
    process.env[envName] = value as string;
  }
}

const envManager = new EnvironmentManager();

export { envManager };
