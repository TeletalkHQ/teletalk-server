import { randomMaker } from "utility-store";

import { models } from "@/models";

const clientIdGenerator = () =>
  randomMaker.id(models.native.clientId.maxLength.value);

const helpers = {
  clientIdGenerator,
};

export { helpers };
