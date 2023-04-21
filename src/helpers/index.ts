import { randomMaker } from "utility-store";

import { databaseHelpers } from "@/helpers/database";
import { models } from "@/models";

const clientIdGenerator = () =>
  randomMaker.id(models.native.clientId.maxlength.value);

const helpers = {
  ...databaseHelpers,
  clientIdGenerator,
};

export { helpers };
