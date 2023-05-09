import { randomMaker } from "utility-store";
import { Trier } from "simple-trier";

import { runner } from "@/index";

import { appConfigs } from "@/classes/AppConfigs";

// import { services } from "$/services/index";

await (async () => {
  appConfigs.setPort(randomMaker.numberWithRange(8000, 50000));

  Trier.changeGlobalConfigs({
    callerName: "unknownCaller",
    canPrintError: false,
  });

  await runner();
  // await resetDatabase();
})();

// const resetDatabase = async () => {
//   await services.deleteAllUsers();
//   await services.deleteAllPrivateChats();
// };
