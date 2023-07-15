import { jest } from "@jest/globals";
import { Trier } from "simple-trier";
import { randomMaker } from "utility-store";

import { appConfigs } from "~/classes/AppConfigs";
import { runner } from "~/index";

jest.retryTimes(10, {
  logErrorsBeforeRetry: false,
});

await (async () => {
  appConfigs.setPort(randomMaker.numberWithRange(8000, 50000));

  logger.offAll();
  logger.on("error");

  Trier.changeGlobalConfigs({
    callerName: "unknownCaller",
    canPrintError: false,
  });

  await runner();
})();
