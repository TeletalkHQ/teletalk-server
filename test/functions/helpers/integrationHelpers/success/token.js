const { successTestBuilder } = require("$/classes/SuccessTestBuilder");

const { models } = require("@/models");

const { validators } = require("@/validators");

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

  //TODO Add min/max length to token model
  builder.typeCheck().gtCheck(100);

  (
    await builder.checkAndExecuteAsync(verifyToken, async () => {
      //BUG token verifier weird bug, i don't know what it is (invalid signature)
      const verifiedToken = await validators.token(responseValue, secret);
      builder
        .customTypeCheck(verifiedToken, "object")
        .customTypeCheck(verifiedToken.signature, "string")
        .customTypeCheck(verifiedToken.payload, "object");
    })
  ).execute();
};

module.exports = {
  token,
};
