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

  return mongoose.connect(configs.DB.MONGO_URL);
};

export const redisConnector = async () => {
  const REDIS_CONNECTION_OPTIONS = {
    HOST: appConfigs.getConfigs().DB.REDIS_HOST,
    PORT: appConfigs.getConfigs().DB.REDIS_PORT,
  };

  const { REDIS_PASSWORD } = appConfigs.getConfigs().DB;

  const storage = createClient({
    socket: {
      tls: false,
      port: REDIS_CONNECTION_OPTIONS.PORT,
      host: REDIS_CONNECTION_OPTIONS.HOST,
    },
    password: REDIS_PASSWORD,
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
