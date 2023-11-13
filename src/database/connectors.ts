import mongoose from "mongoose";
import { createClient } from "redis";

import { appConfigs } from "~/classes/AppConfigs";
import { utils } from "~/utils";

export const mongodbConnector = () => {
	const configs = appConfigs.getConfigs();

	mongoose.set("strictQuery", false);
	mongoose.connection.once("connected", () =>
		logger.info(`MongoDB connected to: ${configs.DB.MONGO_URI}`)
	);

	return mongoose.connect(configs.DB.MONGO_URI);
};

export const redisConnector = async () => {
	const REDIS_CONNECTION_OPTIONS = {
		HOST: appConfigs.getConfigs().DB.REDIS_HOST,
		PASSWORD: appConfigs.getConfigs().DB.REDIS_PASSWORD,
		PORT: appConfigs.getConfigs().DB.REDIS_PORT,
	};

	const storage = createClient({
		password: REDIS_CONNECTION_OPTIONS.PASSWORD,
		socket: {
			host: REDIS_CONNECTION_OPTIONS.HOST,
			port: +REDIS_CONNECTION_OPTIONS.PORT || undefined,
			tls: false,
		},
	});

	storage.on("connect", () =>
		logger.info(
			`Redis connected to: ${REDIS_CONNECTION_OPTIONS.HOST}:${REDIS_CONNECTION_OPTIONS.PORT}`
		)
	);
	storage.on("error", utils.crashServer);

	await storage.connect();

	return storage;
};

// async function run() {
//   try {
//     // Connect the session to the server	(optional starting in v4.7)
//     await session.connect();
//     // Send a ping to confirm a successful connection
//     await session.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the session will close when you finish/error
//     await session.close();
//   }
// }
// run().catch(console.dir);
