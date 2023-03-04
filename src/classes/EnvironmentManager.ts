import { NodeEnvValue } from "@/types";
import { EnvironmentManager as EnvironmentManagerMain } from "utility-store";

const ENVIRONMENT_KEYS = {
  COVERAGE: "COVERAGE",
  JWT_MAIN_SECRET: "JWT_MAIN_SECRET",
  JWT_SIGN_IN_SECRET: "JWT_SIGN_IN_SECRET",
  SELF_EXEC: "SELF_EXEC",
  LOG_LEVEL: "LOG_LEVEL",
  MONGO_COLLECTION_NAME: "MONGO_COLLECTION_NAME",
  MONGO_PORT: "MONGO_PORT",
  MONGO_URL: "MONGO_URL",
  NODE_ENV: "NODE_ENV",
  PORT: "PORT",
  PORT_DEFAULT: "PORT_DEFAULT",
  REDIS_DEFAULT_PORT: "REDIS_DEFAULT_PORT",
  REDIS_DEFAULT_HOST: "REDIS_DEFAULT_HOST",
  REDIS_HOST: "REDIS_HOST",
  REDIS_PASSWORD: "REDIS_PASSWORD",
  REDIS_PORT: "REDIS_PORT",
  SMS_PROVIDER_1_HOST: "SMS_PROVIDER_1_HOST",
  SMS_PROVIDER_1_ROUTE: "SMS_PROVIDER_1_ROUTE",
  SMS_PROVIDER_1_SENDER: "SMS_PROVIDER_1_SENDER",
  SMS_PROVIDER_1_TOKEN: "SMS_PROVIDER_1_TOKEN",
  SMS_PROVIDER_2_HOST: "SMS_PROVIDER_2_HOST",
  SMS_PROVIDER_2_REPORT_URL: "SMS_PROVIDER_2_REPORT_URL",
  SMS_PROVIDER_2_ROUTE: "SMS_PROVIDER_2_ROUTE",
  SMS_PROVIDER_2_TOKEN: "SMS_PROVIDER_2_TOKEN",
  SMS_PROVIDER_SELECTOR: "SMS_PROVIDER_SELECTOR",
};

type EnvironmentKeys = typeof ENVIRONMENT_KEYS;
class EnvironmentManager extends EnvironmentManagerMain {
  ENVIRONMENT_KEYS: EnvironmentKeys;
  constructor() {
    super();
    this.ENVIRONMENT_KEYS = ENVIRONMENT_KEYS;
  }

  getAllLocalEnvironments() {
    return Object.keys(this.ENVIRONMENT_KEYS).reduce(
      (prevValue, currentValue) => {
        prevValue[currentValue as keyof EnvironmentKeys] = this.getEnvironment(
          currentValue
        ) as keyof EnvironmentKeys;
        return prevValue;
      },
      {} as EnvironmentKeys
    );
  }

  getNodeEnv() {
    return super.getNodeEnv() as NodeEnvValue;
  }
}

const envManager = new EnvironmentManager();

export { envManager };
