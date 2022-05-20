const { expect } = require("@/functions/utilities/testUtils");

const {
  userModels: { privateIdModel },
} = require("@/models/userModels/userModels");

const privateIdMinLength = privateIdModel.minlength.value;
const privateIdMaxLength = privateIdModel.maxlength.value;

const privateIdSuccessTests = (
  { privateIdMain, privateIdTest } = {},
  { stringEquality, modelCheck } = {}
) => {
  if (stringEquality) {
    expect(privateIdTest.length).equal(privateIdMain.length);
    expect(privateIdMain).equal(privateIdTest);
  }

  if (modelCheck) {
    expect(privateIdTest).to.be.an(privateIdModel.type.value);

    expect(privateIdTest.length).to.be.greaterThan(0);

    expect(privateIdTest.length).greaterThanOrEqual(privateIdMinLength);
    expect(privateIdTest.length).lessThanOrEqual(privateIdMaxLength);
  }
};

module.exports = { privateIdSuccessTests };
