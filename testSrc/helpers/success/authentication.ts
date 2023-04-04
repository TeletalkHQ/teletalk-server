import { authManager } from "@/classes/AuthManager";
import {
  SuccessTestBuilder,
  successTestBuilder,
} from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { userIdSuccessTest } from "$/helpers/success/userId";

import { VerifiedToken } from "@/types";
import { SuccessTestExecutorOptions } from "$/types";

import { validators } from "@/validators";

const userModels = models.native.user;

type AuthenticationExecutor = (
  data: { equalValue: any; testValue: any; secret: string },
  options?: SuccessTestExecutorOptions
) => void;

const authenticationSuccessTest: AuthenticationExecutor = async (
  { equalValue, testValue, secret },
  options
) => {
  //FIXME: secret is undefined
  const builder = successTestBuilder
    .create()
    .setVariables(userModels.token, equalValue, testValue)
    .setOptions(options);

  builder.typeCheck().gteCheck().lteCheck().stringEquality();

  const verifiedResponseToken = await validators.token(testValue, secret);
  tokenPartsTypeCheck(builder, verifiedResponseToken, secret);

  const verifiedRequestToken = await validators.token(equalValue, secret);
  tokenPartsTypeCheck(builder, verifiedRequestToken, secret);

  if (secret === authManager.getMainSecret()) {
    userIdSuccessTest({
      equalValue: verifiedRequestToken.data.payload.tokenId,
      testValue: verifiedResponseToken.data.payload.tokenId,
    });
  }

  builder.run();
};

const tokenPartsTypeCheck = (
  builder: SuccessTestBuilder,
  token: VerifiedToken,
  secret: string
) => {
  builder
    .customTypeCheck(token, "object")
    .customTypeCheck(token.data, "object")
    .customTypeCheck(token.data.signature, "string")
    .customTypeCheck(token.data.payload, "object");

  if (secret === authManager.getMainSecret())
    builder.customTypeCheck(token.data.payload.tokenId, "string");
};

export { authenticationSuccessTest };
