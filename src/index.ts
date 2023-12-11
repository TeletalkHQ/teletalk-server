import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
import { setupMaster, setupWorker } from "@socket.io/sticky";
import address from "address";
import cluster from "cluster";
import http from "http";
import os from "os";
import PrettyError from "pretty-error";

import { configs } from "~/classes/Configs";
import { requirements } from "~/requirements";
import { websocketServer } from "~/websocket";

PrettyError.start();

const httpServerListener = () => {
	const { ENVIRONMENT, PORT } = configs.getConfigs().APP;

	logger.info(
		`Server is running. RUNTIME_MODE:${ENVIRONMENT}, PID:${
			process.pid
		}, PORT:${PORT}, ACCESS_POINT:${address.ip()}:${PORT}`
	);
};

await configs.setup();

export const runner = async () => {
	// utils.logEnvironments();

	await requirements.database();
	if (configs.getConfigs().APP.USE_CLUSTERS) {
		runWithClusters();
	} else runNormal();
};

const runWithClusters = async () => {
	if (cluster.isPrimary) setupPrimaryServer();
	else setupWorkerServer();
};

const runNormal = async () => {
	const httpServer = createHttpServerWithListener();
	await websocketServer(httpServer);
};

const setupPrimaryServer = () => {
	const httpServer = createHttpServerWithListener();

	setupMaster(httpServer, {
		loadBalancingMethod: "round-robin",
	});

	setupPrimary();

	cluster.setupPrimary({
		serialization: "advanced",
	});

	forkClusters();

	registerClusterOnExitEvent();
};

const setupWorkerServer = async () => {
	const httpServer = http.createServer();

	const io = await websocketServer(httpServer);

	io.adapter(createAdapter());

	setupWorker(io);
};

const createHttpServerWithListener = () => {
	const httpServer = http.createServer();
	httpServer.listen(configs.getConfigs().APP.PORT, httpServerListener);
	return httpServer;
};

const forkClusters = () => {
	const NUM_OF_WORKER_THREADS = os.cpus().length;
	for (let i = 0; i < NUM_OF_WORKER_THREADS; i++) {
		cluster.fork();
	}
};

const registerClusterOnExitEvent = () => {
	cluster.on("exit", (worker) => {
		logger.debug(`Worker ${worker.process.pid} died`);
		cluster.fork();
	});
};

if (configs.getConfigs().APP.SELF_EXEC) await runner();
