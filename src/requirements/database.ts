import { RedisClientType } from "redis";

import { authSessionStore } from "~/classes/AuthSessionStore";
import { clientStatusStore } from "~/classes/ClientStatusStore";
import { store } from "~/classes/Store";
import { mongodbConnector, redisConnector } from "~/database/connectors";

export const databaseRequirements = async () => {
	const redisClient = await redisConnector();
	await store.initialize(redisClient as RedisClientType);
	await authSessionStore.initialize(redisClient as RedisClientType);
	await clientStatusStore.initialize(redisClient as RedisClientType);
	await mongodbConnector();
};
