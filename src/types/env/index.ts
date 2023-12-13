import { LogLevel } from "..";

export type NodeEnvValue =
  | "build"
  | "development"
  | "production_local"
  | "production"
  | "test_development";

export type EnvFileName = NodeEnvValue | "base";

type StringBoolean = "false" | "true";

export interface Environments {
  CUSTOM_PORT: number;
  LOG_ENVS: StringBoolean;
  LOG_LEVEL: LogLevel;
  MONGO_COLLECTION_NAME: string;
  MONGO_HOST: string;
  MONGO_PASSWORD: string;
  MONGO_PORT: number;
  MONGO_PREFIX: string;
  MONGO_URI: string;
  MONGO_USERNAME: string;
  NODE_ENV: NodeEnvValue;
  PORT: number;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  SELF_EXEC: boolean;
  SESSION_SECRET: string;
  SMS_PROVIDER_1_HOST: string;
  SMS_PROVIDER_1_ROUTE: string;
  SMS_PROVIDER_1_SENDER: string;
  SMS_PROVIDER_1_SESSION: string;
  SMS_PROVIDER_2_HOST: string;
  SMS_PROVIDER_2_REPORT_URL: string;
  SMS_PROVIDER_2_ROUTE: string;
  SMS_PROVIDER_2_SESSION: string;
  SMS_PROVIDER_SELECTOR: number;
  //TODO: Move to testSrc scope
  TEST_RUNNER: "JEST" | "MOCHA";
  USE_CLUSTERS: StringBoolean;
}
