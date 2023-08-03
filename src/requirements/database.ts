import { RedisClientType } from 'redis';

import { clientStore } from '~/classes/ClientStore';
import { mongodbConnector, redisConnector } from '~/database/connectors';

export const databaseRequirements = async () => {
	const redisClient = await redisConnector();
	await clientStore.initialize(redisClient as RedisClientType);
	await mongodbConnector();
};
