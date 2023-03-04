import { SocketMethods } from "@/types";

interface Environments {
  JWT_MAIN_SECRET: string;
  JWT_SIGN_IN_SECRET: string;
  SELF_EXEC: boolean;
  LOG_LEVEL: string;
  MONGO_COLLECTION_NAME: string;
  MONGO_PORT: number;
  MONGO_URL: string;
  NODE_ENV: string;
  PORT: number;
  PORT_DEFAULT: number;
  REDIS_DEFAULT_PORT: number;
  REDIS_DEFAULT_HOST: string;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  SMS_PROVIDER_1_HOST: string;
  SMS_PROVIDER_1_ROUTE: string;
  SMS_PROVIDER_1_SENDER: string;
  SMS_PROVIDER_1_TOKEN: string;
  SMS_PROVIDER_2_HOST: string;
  SMS_PROVIDER_2_REPORT_URL: string;
  SMS_PROVIDER_2_ROUTE: string;
  SMS_PROVIDER_2_TOKEN: string;
  SMS_PROVIDER_SELECTOR: number;
}
interface IoField {
  type: string;
  value: undefined | IoField | IoField[];
  required: boolean;
}

interface Route {
  inputFields: IoField | Record<string, never>;
  outputFields: IoField | Record<string, never>;
  statusCode: number;
}

interface SocketRoute extends Route {
  name: string;
  handler: () => void;
  method: SocketMethods;
}

export { Environments, IoField, Route, SocketRoute };
