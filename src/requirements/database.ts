import { RedisClientType } from "redis";

import { temporaryClients } from "@/classes/TemporaryClients";

import { mongodbConnector, redisConnector } from "@/database/connectors";

const databaseRequirements = async () => {
  const redisClient = await redisConnector();
  await temporaryClients.initialize(redisClient as RedisClientType);
  await mongodbConnector();
};

export { databaseRequirements };
