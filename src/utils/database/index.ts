import mongoose from "mongoose";
import { RedisClientType, createClient } from "redis";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { clientStatusStore } from "~/classes/ClientStatusStore";
import { configs } from "~/classes/Configs";
import { store } from "~/classes/Store";
import { utils } from "~/utils";

const initializeDatabases = async () => {
  const redisClient = await redisConnector();
  await store.initialize(redisClient as RedisClientType);
  await authSessionStore.initialize(redisClient as RedisClientType);
  await clientStatusStore.initialize(redisClient as RedisClientType);
  await mongodbConnector();
};

const mongodbConnector = () => {
  const { DB: DB_CONFIGS } = configs.getConfigs();

  mongoose.set("strictQuery", false);
  mongoose.connection.once("connected", () =>
    logger.info(`MongoDB connected to: ${DB_CONFIGS.MONGO_URI}`)
  );

  return mongoose.connect(DB_CONFIGS.MONGO_URI);
};

const redisConnector = async () => {
  const REDIS_CONNECTION_OPTIONS = {
    HOST: configs.getConfigs().DB.REDIS_HOST,
    PASSWORD: configs.getConfigs().DB.REDIS_PASSWORD,
    PORT: configs.getConfigs().DB.REDIS_PORT,
  };

  const storage = createClient({
    password: REDIS_CONNECTION_OPTIONS.PASSWORD,
    socket: {
      host: REDIS_CONNECTION_OPTIONS.HOST,
      port: +REDIS_CONNECTION_OPTIONS.PORT || undefined,
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

export const databaseUtils = {
  initializeDatabases,
  mongodbConnector,
  redisConnector,
};

// async function run() {
//   try {
//     // Connect the session to the server	(optional starting in v4.7)
//     await session.connect();
//     // Send a ping to confirm a successful connection
//     await session.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the session will close when you finish/error
//     await session.close();
//   }
// }
// run().catch(console.dir);
