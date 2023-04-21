import mongoose from "mongoose";
import { createClient } from "redis";

import { appConfigs } from "@/classes/AppConfigs";
import { envManager } from "@/classes/EnvironmentManager";

import { utilities } from "@/utilities";

//REFACTOR: all major

const mongodbConnector = () => {
  const configs = appConfigs.getConfigs();

  mongoose.set("strictQuery", false);
  mongoose.connection.once("connected", () =>
    logger.info(
      `MongoDB connected to =>  ${mongoose.connection.host}:${mongoose.connection.port}`
    )
  );

  return mongoose.connect(configs.db.MONGO_URL_FULL, {
    keepAlive: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
};

const redisConnector = async () => {
  const REDIS_CONNECTION_OPTIONS = fixRedisConnection();
  const { REDIS_PASSWORD } = envManager.getEnvironment();

  const storage = createClient({
    socket: {
      tls: false,
      port: +REDIS_CONNECTION_OPTIONS.port,
      host: REDIS_CONNECTION_OPTIONS.host,
    },
    password: REDIS_PASSWORD,
  });

  storage.on("connect", () =>
    logger.info(
      `Redis connected to => ${REDIS_CONNECTION_OPTIONS.host}:${REDIS_CONNECTION_OPTIONS.port}`
    )
  );
  storage.on("error", utilities.crashServer);

  await storage.connect();

  return storage;
};

const fixRedisConnection = () => {
  const fixedHost = fixRedisHost();
  const fixedPort = fixRedisPort();

  return {
    host: fixedHost,
    port: fixedPort,
  };
};

const fixRedisHost = () => {
  const { REDIS_HOST, REDIS_PORT } = envManager.getEnvironment();

  if (
    [REDIS_HOST, REDIS_PORT?.toString()].some((item = "") =>
      item.includes("tcp://")
    )
  ) {
    return (REDIS_HOST || REDIS_PORT.toString())
      .replace("tcp://", "")
      .split(":")[0];
  }

  return REDIS_HOST;
};

const fixRedisPort = () => {
  const { REDIS_PORT } = envManager.getEnvironment();

  if (REDIS_PORT?.toString().includes("tcp://")) {
    return REDIS_PORT.toString().split(":")[2];
  }

  return REDIS_PORT.toString();
};

export { mongodbConnector, redisConnector };
