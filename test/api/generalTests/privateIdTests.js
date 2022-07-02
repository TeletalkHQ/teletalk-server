const { testBuilder } = require("@/classes/TestBuilder");

const {
  userModels: { privateIdModel },
} = require("@/models/userModels/userModels");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const privateIdSuccessTests = (
  { privateIdMain, privateIdTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
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
