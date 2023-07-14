// import { createAdapter, setupPrimary } from "@socket.io/cluster-adapter";
// import { setupMaster, setupWorker } from "@socket.io/sticky";
import address from "address";
// import cluster from "cluster";
// import os from "os";
import PrettyError from "pretty-error";

import { appConfigs } from "~/classes/AppConfigs";
import { crateHttpServer } from "~/http";
import { requirements } from "~/requirements";
// import { utils } from "~/utils";
import { websocketServer } from "~/websocket";

PrettyError.start();

await appConfigs.setup();

const listeningListener = () => {
  const { ENVIRONMENT, PORT } = appConfigs.getConfigs().APP;

  logger.info(
    `Server is running in ${ENVIRONMENT} mode on port ${PORT}`,
    `url: http://${address.ip()}:${PORT}`
  );
};

export const runner = async () => {
  // if (cluster.isPrimary) {
  // utils.logEnvironments();

  //   const NUM_WORKERS = os.cpus().length;

  //   logger.debug(`Master ${process.pid} is running`);

  //   const httpServer = crateHttpServer();

  //   setupMaster(httpServer, {
  //     loadBalancingMethod: "round-robin",
  //   });

  //   setupPrimary();

  //   httpServer.listen(appConfigs.getConfigs().APP.PORT);

  //   for (let i = 0; i < NUM_WORKERS; i++) cluster.fork();
  // } else {
  await requirements.database();

  //   logger.debug(`Worker ${process.pid} started`);

  const httpServer = crateHttpServer();
  httpServer.listen(appConfigs.getConfigs().APP.PORT, listeningListener);

  // const io =
  websocketServer(httpServer);
  //   io.adapter(createAdapter());
  //   setupWorker(io);
  // }
};

if (appConfigs.getConfigs().APP.SELF_EXEC) await runner();
