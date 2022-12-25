const { authManager } = require("@/classes/AuthManager");
const { successTestBuilder } = require("$/classes/SuccessTestBuilder");
const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { models } = require("@/models");

const {
  cellphoneSuccessTest,
} = require("$/tests/integration/helpers/success/cellphone");
const {
  userIdSuccessTest,
} = require("$/tests/integration/helpers/success/userId");

const { validators } = require("@/validators");

const { FIELD_TYPE } = require("@/variables/others/fieldType");

const userModels = models.native.user;

const authenticationSuccessTest = async (
  { requestValue, responseValue, secret },
  {
    modelCheck = true,
    stringEquality = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  const builder = successTestBuilder
    .create()
    .setVariables(userModels.token, requestValue, responseValue)
    .setOptions({ modelCheck });

  builder.typeCheck().gteCheck().lteCheck();

  const verifiedResponseToken = await validators.token(responseValue, secret);
  tokenCustomTypeCheck(builder, verifiedResponseToken, secret);

  if (stringEquality) {
    builder.stringEquality();

    const verifiedRequestToken = await validators.token(requestValue, secret);
    tokenCustomTypeCheck(builder, verifiedRequestToken, secret);

    userIdSuccessTest({
      requestValue: verifiedRequestToken.payload.userId,
      responseValue: verifiedResponseToken.payload.userId,
    });
    cellphoneSuccessTest({
      requestValue: verifiedRequestToken.payload,
      responseValue: verifiedResponseToken.payload,
    });
  }

  builder.run();
};

const tokenCustomTypeCheck = (builder, token, secret) => {
  builder
    .customTypeCheck(token, FIELD_TYPE.OBJECT)
    .customTypeCheck(token.signature, FIELD_TYPE.STRING)
    .customTypeCheck(token.payload, FIELD_TYPE.OBJECT)
    .customTypeCheck(token.payload.countryCode, FIELD_TYPE.STRING)
    .customTypeCheck(token.payload.countryName, FIELD_TYPE.STRING)
    .customTypeCheck(token.payload.phoneNumber, FIELD_TYPE.STRING);
  if (secret === authManager.getJwtMainSecret)
    builder.customTypeCheck(token.payload.userId, FIELD_TYPE.STRING);
};

module.exports = {
  authenticationSuccessTest,
};
