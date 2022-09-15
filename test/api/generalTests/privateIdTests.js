const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const {
  userModels: { privateIdModel },
} = require("@/models/dataModels/userModels");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");

const privateIdSuccessTests = (
  { privateIdMain, privateIdTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(privateIdModel, privateIdMain, privateIdTest)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .addCommonTest()
    .execute();
};

module.exports = { privateIdSuccessTests };
