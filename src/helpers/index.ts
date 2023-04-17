import { randomMaker } from "utility-store";

import { envManager } from "@/classes/EnvironmentManager";

import { databaseHelpers } from "@/helpers/database";

const clientIdGenerator = () =>
  randomMaker.id(envManager.getEnvironment().CLIENT_ID_LENGTH);

const helpers = {
  ...databaseHelpers,
  clientIdGenerator,
};

export { helpers };
