const { expect } = require("@/functions/utilities/testUtils");

const {
  userModels: { tokenModel },
} = require("@/models/userModels/userModels");
const { tokenValidator } = require("@/validators/userValidators");

const tokenSuccessTests = async (
  { tokenTest, secret } = {},
  { modelCheck, verifyToken } = {}
) => {
  if (modelCheck) {
    expect(tokenTest).to.be.an(tokenModel.type.value);
    expect(tokenTest.length).to.be.greaterThan(10);
  }

  if (verifyToken) {
    const verifiedToken = await tokenValidator(tokenTest, secret);

    expect(verifiedToken).to.be.an("object");
    expect(verifiedToken.signature).to.be.an("string");
    expect(verifiedToken.payload).to.be.an("object");
  }
};

module.exports = {
  // tokenFailureTests,
  tokenSuccessTests,
};
