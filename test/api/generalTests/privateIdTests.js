const { testBuilder } = require("@/classes/TestBuilder");

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
    .create()
    .setVariables(privateIdModel, privateIdMain, privateIdTest)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .addCommonTest()
    .execute();
};

module.exports = { privateIdSuccessTests };
