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
  testBuilder
    .setVariables(tokenModel, "", tokenTest)
    .setOptions({ modelCheck })
    .typeCheck()
    .gtCheck(10);

  (
    await testBuilder.checkAndExecuteAsync(verifyToken, async () => {
      const verifiedToken = await tokenValidator(tokenTest, secret);
      testBuilder
        .customTypeCheck(verifiedToken, "object")
        .customTypeCheck(verifiedToken.signature, "string")
        .customTypeCheck(verifiedToken.payload, "object");
    })
  ).execute();
};

module.exports = {
  // tokenFailureTests,
  tokenSuccessTests,
};
