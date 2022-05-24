const { testBuilder } = require("@/functions/testUtilities/TestBuilder");

const {
  userModels: { privateIdModel },
} = require("@/models/userModels/userModels");

const privateIdSuccessTests = (
  { privateIdMain, privateIdTest } = {},
  { stringEquality = true, modelCheck = true } = {
    stringEquality: true,
    modelCheck: true,
  }
) => {
  testBuilder.setVariables(privateIdModel, privateIdMain, privateIdTest);

  if (stringEquality) testBuilder.stringEquality().execute(false);

  if (modelCheck) {
    testBuilder.typeCheck().gteCheck().lteCheck().execute();
  }
};

module.exports = { privateIdSuccessTests };
