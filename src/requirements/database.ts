import { RedisClientType } from "redis";

import { authClientStore } from "~/classes/AuthClientStore";
import { clientStatusStore } from "~/classes/ClientStatusStore";
import { clientStore } from "~/classes/ClientStore";
import { mongodbConnector, redisConnector } from "~/database/connectors";

export const databaseRequirements = async () => {
	const redisClient = await redisConnector();
	await clientStore.initialize(redisClient as RedisClientType);
	await authClientStore.initialize(redisClient as RedisClientType);
	await clientStatusStore.initialize(redisClient as RedisClientType);
	await mongodbConnector();
};
