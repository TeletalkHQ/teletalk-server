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
  const REDIS_CONNECTION_OPTIONS = fixRedisConnection();
  const { REDIS_PASSWORD } = envManager.getAllLocalEnvironments();

  const storage = redis.createClient({
    socket: REDIS_CONNECTION_OPTIONS,
    password: REDIS_PASSWORD,
  });

  storage.on("connect", () =>
    logger.info(
      `Redis connected to => ${REDIS_CONNECTION_OPTIONS.host}:${REDIS_CONNECTION_OPTIONS.port}`
    )
  );
  storage.on("error", crashServer);

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
  const { REDIS_DEFAULT_HOST, REDIS_HOST, REDIS_PORT } =
    envManager.getAllLocalEnvironments();

  if ([REDIS_HOST, REDIS_PORT].some((item = "") => item.includes("tcp://"))) {
    return (REDIS_HOST || REDIS_PORT).replace("tcp://", "").split(":")[0];
  }

  return REDIS_HOST || REDIS_DEFAULT_HOST;
};

const fixRedisPort = () => {
  const { REDIS_DEFAULT_PORT, REDIS_PORT } =
    envManager.getAllLocalEnvironments();

  if (REDIS_PORT?.includes("tcp://")) {
    return REDIS_PORT.split(":")[2];
  }

  return REDIS_PORT || REDIS_DEFAULT_PORT;
};

module.exports = {
  mongodbConnector,
  redisConnector,
};
