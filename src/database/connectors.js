const mongoose = require("mongoose");
const redis = require("redis");

const { appConfigs } = require("@/classes/AppConfigs");
const { envManager } = require("@/classes/EnvironmentManager");
const { crashServer } = require("@/utilities/utilities");

const mongodbConnector = () => {
  const configs = appConfigs.getConfigs();

  mongoose.set("strictQuery", false);
  mongoose.connection.once("connected", () => {
    logger.info(
      `MongoDB connected to =>  ${mongoose.connection.host}:${mongoose.connection.port}`
    );
  });

  return mongoose.connect(configs.db.MONGO_URL_FULL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const redisConnector = async () => {
  const REDIS_CONNECTION_OPTIONS = examineRedisConnectionOptions();
  const storage = redis.createClient(REDIS_CONNECTION_OPTIONS);
  storage.on("connect", () =>
    logger.info(
      `Redis connected to => ${
        REDIS_CONNECTION_OPTIONS.host
          ? `${REDIS_CONNECTION_OPTIONS.host}:${REDIS_CONNECTION_OPTIONS.port}`
          : `localhost:${REDIS_CONNECTION_OPTIONS}`
      }`
    )
  );
  storage.on("error", crashServer);

  await storage.connect();

  return storage;
};

const examineRedisConnectionOptions = () => {
  const {
    REDIS_CLOUD_HOST,
    REDIS_DEFAULT_PORT,
    //? This is actually redis tcp url from docker!
    REDIS_PORT,
  } = envManager.getAllLocalEnvironments();

  const REDIS_OPTIONS = REDIS_CLOUD_HOST && makeRedisOptions();

  return REDIS_PORT || REDIS_OPTIONS || REDIS_DEFAULT_PORT;
};

const makeRedisOptions = () => {
  const { REDIS_CLOUD_HOST, REDIS_CLOUD_PASSWORD, REDIS_CLOUD_PORT } =
    envManager.getAllLocalEnvironments();

  return {
    host: REDIS_CLOUD_HOST,
    password: REDIS_CLOUD_PASSWORD,
    port: REDIS_CLOUD_PORT,
  };
};

module.exports = {
  mongodbConnector,
  redisConnector,
};
