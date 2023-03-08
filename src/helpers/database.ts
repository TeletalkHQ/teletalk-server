import { envManager } from "@/classes/EnvironmentManager";

const getMongoUrl = () => {
  return envManager.getEnvironment().MONGO_URL;
};

const makeMongoFullUrl = () => {
  const {
    MONGO_COLLECTION_NAME,
    //? This is actually mongoDb tcp url from docker!
    MONGO_PORT,
  } = envManager.getEnvironment();

  const CORRECTED_MONGO_URL_FROM_DOCKER = MONGO_PORT?.toString().replace(
    "tcp://",
    "mongodb://"
  );
  const mongoUrl = CORRECTED_MONGO_URL_FROM_DOCKER || getMongoUrl();

  return `${mongoUrl}/${MONGO_COLLECTION_NAME}`;
};

const databaseHelpers = {
  getMongoUrl,
  makeMongoFullUrl,
};

export { databaseHelpers };
