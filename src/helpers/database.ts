import { envManager } from "@/classes/EnvironmentManager";

const getMongoUrl = () => {
  return envManager.getEnvironment(envManager.ENVIRONMENT_KEYS.MONGO_URL);
};

const contactMongoUrlWithCollectionName = () => {
  const {
    MONGO_COLLECTION_NAME,
    //? This is actually mongoDb tcp url from docker!
    MONGO_PORT,
  } = envManager.getAllLocalEnvironments();

  const CORRECTED_MONGO_URL_FROM_DOCKER =
    MONGO_PORT && MONGO_PORT.replace("tcp://", "mongodb://");
  const mongoUrl = CORRECTED_MONGO_URL_FROM_DOCKER || getMongoUrl();

  return `${mongoUrl}/${MONGO_COLLECTION_NAME}`;
};

const databaseHelpers = {
  contactMongoUrlWithCollectionName,
  getMongoUrl,
};

export { databaseHelpers };
