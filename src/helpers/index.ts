import JWT from "jsonwebtoken";
import { randomMaker } from "utility-store";

import { appConfigs } from "@/classes/AppConfigs";

import { models } from "@/models";

const signClientId = (length?: number) =>
  JWT.sign(
    randomMaker.id(length || models.native.id.maxLength),
    appConfigs.getConfigs().APP.CLIENT_ID_SECRET
  );

const verifyClientId = (clientId: string) =>
  JWT.verify(clientId, appConfigs.getConfigs().APP.CLIENT_ID_SECRET);

const helpers = {
  signClientId,
  verifyClientId,
};

export { helpers };
