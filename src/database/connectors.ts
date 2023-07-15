import mongoose from "mongoose";
import { createClient } from "redis";

import { appConfigs } from "~/classes/AppConfigs";
import { utils } from "~/utils";

export const mongodbConnector = () => {
  const configs = appConfigs.getConfigs();

  mongoose.set("strictQuery", false);
  mongoose.connection.once("connected", () =>
    logger.info(
      `MongoDB connected to: ${mongoose.connection.host}:${mongoose.connection.port}`
    )
  );

  return mongoose.connect(configs.DB.MONGO_URI);
};

export const redisConnector = async () => {
  const REDIS_CONNECTION_OPTIONS = {
    HOST: appConfigs.getConfigs().DB.REDIS_HOST,
    PASSWORD: appConfigs.getConfigs().DB.REDIS_PASSWORD,
    PORT: appConfigs.getConfigs().DB.REDIS_PORT,
  };

  logger.info("REDIS_CONNECTION_OPTIONS:", REDIS_CONNECTION_OPTIONS);

  const storage = createClient({
    password: REDIS_CONNECTION_OPTIONS.PASSWORD,
    socket: {
      host: REDIS_CONNECTION_OPTIONS.HOST,
      port: REDIS_CONNECTION_OPTIONS.PORT,
      tls: false,
    },
  });

  storage.on("connect", () =>
    logger.info(
      `Redis connected to: ${REDIS_CONNECTION_OPTIONS.HOST}:${REDIS_CONNECTION_OPTIONS.PORT}`
    )
  );
  storage.on("error", utils.crashServer);

  await storage.connect();

  return storage;
};
