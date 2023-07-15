import { Trier } from "simple-trier";
import { randomMaker } from "utility-store";

import { appConfigs } from "~/classes/AppConfigs";
import { runner } from "~/index";

export const testServerInitializer = async () => {
  appConfigs.setPort(randomMaker.numberWithRange(8000, 50000));

  logger.offAll();
  logger.on("debug");

  Trier.changeGlobalConfigs({
    callerName: "unknownCaller",
    canPrintError: false,
  });

  await runner();
};
