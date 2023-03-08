import { RedisClientType } from "redis";

import { appConfigs } from "@/classes/AppConfigs";
import { temporaryClients } from "@/classes/TemporaryClients";

import { mongodbConnector, redisConnector } from "@/database/connectors";

const databaseRequirements = async () => {
  await appConfigs.setup();
  const redisClient = await redisConnector();
  await temporaryClients.initialize(redisClient as RedisClientType);
  mongodbConnector();
};

export { databaseRequirements };
