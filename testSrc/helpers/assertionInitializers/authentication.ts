import {
  AssertionInitializer,
  assertionInitializer,
} from "$/classes/AssertionInitializer";
import { authManager } from "@/classes/AuthManager";

import { models } from "@/models";

import { userIdAssertionInitializer } from "$/helpers/assertionInitializers/userId";

import { AssertionInitializerOptions } from "$/types";
import { Verified } from "@/types";

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
    .setVariables(userModels.session, equalValue, testValue)
    .setOptions(options);

  builder.typeCheck().gteCheck().lteCheck().stringEquality();

  const verifiedResponse = await validators.session(testValue, secret);
  sessionPartsTypeCheck(builder, verifiedResponse, secret);

  const verifiedRequest = await validators.session(equalValue, secret);
  sessionPartsTypeCheck(builder, verifiedRequest, secret);

  if (secret === authManager.getMainSecret()) {
    userIdAssertionInitializer({
      equalValue: verifiedRequest.data.payload.sessionId,
      testValue: verifiedResponse.data.payload.sessionId,
    });
  }

  builder.run();
};

const sessionPartsTypeCheck = (
  builder: AssertionInitializer,
  session: Verified,
  secret: string
) => {
  builder
    .customTypeCheck(session, "object")
    .customTypeCheck(session.data, "object")
    .customTypeCheck(session.data.signature, "string")
    .customTypeCheck(session.data.payload, "object");

  if (secret === authManager.getMainSecret())
    builder.customTypeCheck(session.data.payload.sessionId, "string");
};

export { authenticationAssertion };
