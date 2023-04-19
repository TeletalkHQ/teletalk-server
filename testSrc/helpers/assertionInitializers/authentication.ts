import {
  AssertionInitializer,
  assertionInitializer,
} from "$/classes/AssertionInitializer";
import { authManager } from "@/classes/AuthManager";

import { models } from "@/models";

import { userIdAssertionInitializer } from "$/helpers/assertionInitializers/userId";

import { AssertionInitializerOptions } from "$/types";
import { VerifiedToken } from "@/types";

import { validators } from "@/validators";

const userModels = models.native.user;

type AuthenticationAssertionHelper = (
  data: { equalValue: any; testValue: any; secret: string },
  options?: AssertionInitializerOptions
) => void;

const authenticationAssertion: AuthenticationAssertionHelper = async (
  { equalValue, testValue, secret },
  options
) => {
  //FIXME: secret is undefined
  const builder = assertionInitializer
    .create()
    .setVariables(userModels.token, equalValue, testValue)
    .setOptions(options);

  builder.typeCheck().gteCheck().lteCheck().stringEquality();

  const verifiedResponseToken = await validators.token(testValue, secret);
  tokenPartsTypeCheck(builder, verifiedResponseToken, secret);

  const verifiedRequestToken = await validators.token(equalValue, secret);
  tokenPartsTypeCheck(builder, verifiedRequestToken, secret);

  if (secret === authManager.getMainSecret()) {
    userIdAssertionInitializer({
      equalValue: verifiedRequestToken.data.payload.sessionId,
      testValue: verifiedResponseToken.data.payload.sessionId,
    });
  }

  builder.run();
};

const tokenPartsTypeCheck = (
  builder: AssertionInitializer,
  token: VerifiedToken,
  secret: string
) => {
  builder
    .customTypeCheck(token, "object")
    .customTypeCheck(token.data, "object")
    .customTypeCheck(token.data.signature, "string")
    .customTypeCheck(token.data.payload, "object");

  if (secret === authManager.getMainSecret())
    builder.customTypeCheck(token.data.payload.sessionId, "string");
};

export { authenticationAssertion };
