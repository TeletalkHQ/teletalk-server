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
  testBuilder
    .setVariables(privateIdModel, privateIdMain, privateIdTest)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .addCommonTest()
    .execute();
};

module.exports = { privateIdSuccessTests };
