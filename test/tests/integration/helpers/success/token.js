const { successTestBuilder } = require("$/classes/SuccessTestBuilder");

const { models } = require("@/models");

const { validators } = require("@/validators");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

const userModels = models.native.user;

const token = async (
  { responseValue, secret } = {},
  { verifyToken = true, modelCheck = true } = {
    verifyToken: true,
    modelCheck: true,
  }
) => {
  const builder = successTestBuilder
    .create()
    .setVariables(userModels.token, "", responseValue)
    .setOptions({ modelCheck });

  builder.typeCheck().gteCheck().lteCheck();

  (
    await builder.checkAndExecuteAsync(verifyToken, async () => {
      //BUG token verifier weird bug, i don't know what it is (invalid signature)
      const verifiedToken = await validators.token(responseValue, secret);
      builder
        .customTypeCheck(verifiedToken, FIELD_TYPE.OBJECT)
        .customTypeCheck(verifiedToken.signature, FIELD_TYPE.STRING)
        .customTypeCheck(verifiedToken.payload, FIELD_TYPE.OBJECT);
    })
  ).execute();
};

module.exports = {
  token,
};
