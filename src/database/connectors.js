const mongoose = require("mongoose");
const Redis = require("ioredis");
const { trier } = require("utility-store/src/classes/Trier");

const { appConfigs } = require("@/classes/AppConfigs");
const { envManager } = require("@/classes/EnvironmentManager");

const tryConnectToMongodb = () => {
  const configs = appConfigs.getConfigs();

  mongoose.connection.once("connected", () => {
    logger.info(
      `MongoDB connected to =>  ${mongoose.connection.host}:${mongoose.connection.port}`
    );
  });

  return mongoose.connect(configs.db.MONGO_URL_WITH_COLLECTION_NAME, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
const mongodbConnector = () => {
  return trier(mongodbConnector.name)
    .try(tryConnectToMongodb)
    .printAndThrow()
    .result();
};

const makeRedisCloudOptions = () => {
  const { REDIS_CLOUD_HOST, REDIS_CLOUD_PASSWORD, REDIS_CLOUD_PORT } =
    envManager.getAllLocalEnvironments();

  return {
    host: REDIS_CLOUD_HOST,
    password: REDIS_CLOUD_PASSWORD,
    port: REDIS_CLOUD_PORT,
  };
};
const examineRedisConnectionOptions = () => {
  const {
    REDIS_CLOUD_HOST,
    REDIS_DEFAULT_PORT,
    //? This is actually redis tcp url from docker!
    REDIS_PORT,
  } = envManager.getAllLocalEnvironments();

  const REDIS_CLOUD_OPTIONS = REDIS_CLOUD_HOST && makeRedisCloudOptions();

  return REDIS_PORT || REDIS_CLOUD_OPTIONS || REDIS_DEFAULT_PORT;
};
const redisConnector = () => {
  const REDIS_CONNECTION_OPTIONS = examineRedisConnectionOptions();
  const storage = new Redis(REDIS_CONNECTION_OPTIONS);

  storage.on("connect", () =>
    logger.info(
      `Redis connected to => ${
        REDIS_CONNECTION_OPTIONS.port
          ? `${REDIS_CONNECTION_OPTIONS.host}:${REDIS_CONNECTION_OPTIONS.port}`
          : `localhost:${REDIS_CONNECTION_OPTIONS}`
      }`
    )
  );
  storage.on("error", (error) => logger.error(error));

  return storage;
};

module.exports = {
  mongodbConnector,
  redisConnector,
};
