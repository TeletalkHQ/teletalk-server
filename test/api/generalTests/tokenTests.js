const { testBuilder } = require("@/classes/TestBuilder");

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
  const ts = testBuilder
    .create()
    .setVariables(tokenModel, "", tokenTest)
    .setOptions({ modelCheck });

  ts.typeCheck().gtCheck(10);

  (
    await ts.checkAndExecuteAsync(verifyToken, async () => {
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
