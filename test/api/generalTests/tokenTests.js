const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const {
  userModels: { tokenModel },
} = require("@/models/userModels/userModels");

const { tokenValidator } = require("@/validators/userValidators");

const tokenSuccessTests = async (
  { tokenTest, secret } = {},
  { verifyToken = true, modelCheck = true } = {
    verifyToken: true,
    modelCheck: true,
  }
) => {
  const ts = successTestBuilder
    .create()
    .setVariables(tokenModel, "", tokenTest)
    .setOptions({ modelCheck });

  //TODO Add min/max length to token model
  ts.typeCheck().gtCheck(100);

  (
    await ts.checkAndExecuteAsync(verifyToken, async () => {
      //BUG token verifier weird bug, i don't know what it is
      const verifiedToken = await tokenValidator(tokenTest, secret);
      ts.customTypeCheck(verifiedToken, "object")
        .customTypeCheck(verifiedToken.signature, "string")
        .customTypeCheck(verifiedToken.payload, "object");
    })
  ).execute();
};

module.exports = {
  // tokenFailureTests,
  tokenSuccessTests,
};
