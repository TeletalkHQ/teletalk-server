import { authManager } from "@/classes/AuthManager";
import { successTestBuilder } from "$/classes/SuccessTestBuilder";
import { testVariablesManager } from "$/classes/TestVariablesManager";

import { models } from "@/models";

import { cellphoneSuccessTest } from "$/tests/integration/helpers/success/cellphone";
import { userIdSuccessTest } from "$/tests/integration/helpers/success/userId";

import { validators } from "@/validators";

import { FIELD_TYPE } from "@/variables/others/fieldType";

const userModels = models.native.user;

const authenticationSuccessTest = async (
  { equalValue, testValue, secret },
  options = testVariablesManager.successTestDefaultOptions
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
      equalValue: verifiedRequestToken.payload.userId,
      testValue: verifiedResponseToken.payload.userId,
    });
  }

  if (secret === authManager.getSignInSecret()) {
    cellphoneSuccessTest({
      equalValue: verifiedRequestToken.payload,
      testValue: verifiedResponseToken.payload,
    });
  }

  builder.run();
};

const tokenPartsTypeCheck = (builder, token, secret) => {
  builder
    .customTypeCheck(token, FIELD_TYPE.OBJECT)
    .customTypeCheck(token.data, FIELD_TYPE.OBJECT)
    .customTypeCheck(token.data.signature, FIELD_TYPE.STRING)
    .customTypeCheck(token.data.payload, FIELD_TYPE.OBJECT);

  //TODO: Need to remove
  if (secret === authManager.getSignInSecret()) {
    builder
      .customTypeCheck(token.data.payload.countryCode, FIELD_TYPE.STRING)
      .customTypeCheck(token.data.payload.countryName, FIELD_TYPE.STRING)
      .customTypeCheck(token.data.payload.phoneNumber, FIELD_TYPE.STRING);
  }

  if (secret === authManager.getMainSecret())
    builder.customTypeCheck(token.data.payload.tokenId, FIELD_TYPE.STRING);
};

export { authenticationSuccessTest };
