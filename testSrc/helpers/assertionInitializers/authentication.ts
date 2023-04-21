import {
  AssertionInitializer,
  assertionInitializer,
} from "$/classes/AssertionInitializer";
import { authManager } from "@/classes/AuthManager";

import { models } from "@/models";

import { userIdAssertionInitializer } from "$/helpers/assertionInitializers/userId";

import { AssertionInitializerOptions } from "$/types";
import { VerifiedSession } from "@/types";

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
    .setVariables(models.native.session, equalValue, testValue)
    .setOptions(options);

  builder.typeCheck().gteCheck().lteCheck().stringEquality();

  const verifiedResponse = authManager.verify(testValue, secret);
  sessionPartsTypeCheck(builder, verifiedResponse, secret);

  const verifiedRequest = authManager.verify(equalValue, secret);
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
  session: VerifiedSession,
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
