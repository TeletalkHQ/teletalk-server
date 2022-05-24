const { testBuilder } = require("@/functions/testUtilities/TestBuilder");

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
  testBuilder.setVariables(tokenModel, "", tokenTest);

  if (modelCheck) {
    testBuilder.typeCheck().gtCheck(10).execute(false);
  }

  if (verifyToken) {
    const verifiedToken = await tokenValidator(tokenTest, secret);

    testBuilder
      .customTypeCheck(verifiedToken, "object")
      .customTypeCheck(verifiedToken.signature, "string")
      .customTypeCheck(verifiedToken.payload, "object")
      .execute();
  }
};

module.exports = {
  // tokenFailureTests,
  tokenSuccessTests,
};
