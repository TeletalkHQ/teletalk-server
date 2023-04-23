import mongoose from "mongoose";
import { createClient } from "redis";

import { appConfigs } from "@/classes/AppConfigs";

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

  return mongoose.connect(configs.DB.MONGO_URL_FULL, {
    keepAlive: true,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
};

const redisConnector = async () => {
  const REDIS_CONNECTION_OPTIONS = fixRedisConnection();
  const { REDIS_PASSWORD } = appConfigs.getConfigs().DB;

  const storage = createClient({
    socket: {
      tls: false,
      port: +REDIS_CONNECTION_OPTIONS.PORT,
      host: REDIS_CONNECTION_OPTIONS.HOST,
    },
    password: REDIS_PASSWORD,
  });

  storage.on("connect", () =>
    logger.info(
      `Redis connected to => ${REDIS_CONNECTION_OPTIONS.HOST}:${REDIS_CONNECTION_OPTIONS.PORT}`
    )
  );
  storage.on("error", utilities.crashServer);

  await storage.connect();

  return storage;
};

const fixRedisConnection = () => {
  const FIXED_HOST = fixRedisHost();
  const FIXED_PORT = fixRedisPort();

  return {
    HOST: FIXED_HOST,
    PORT: FIXED_PORT,
  };
};

const fixRedisHost = () => {
  const { REDIS_HOST, REDIS_PORT } = appConfigs.getConfigs().DB;

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
  const { REDIS_PORT } = appConfigs.getConfigs().DB;

  if (REDIS_PORT?.toString().includes("tcp://")) {
    return REDIS_PORT.toString().split(":")[2];
  }

  return REDIS_PORT.toString();
};

export { mongodbConnector, redisConnector };
