const { successTestBuilder } = require("@/classes/SuccessTestBuilder");

const {
  userModels: { lastNameModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: {
    LAST_NAME_INVALID_TYPE,
    LAST_NAME_MAXLENGTH_REACH,
    LAST_NAME_MINLENGTH_REACH,
  },
} = require("@/variables/errors/userErrors");
const {
  successTestDefaultOptions,
} = require("@/variables/others/testVariables");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const lastNameSuccessTests = (
  { lastNameMain, lastNameTest } = {},
  { stringEquality = true, modelCheck = true } = successTestDefaultOptions
) => {
  const ts = successTestBuilder
    .create()
    .setVariables(lastNameModel, lastNameMain, lastNameTest)
    .setOptions({ modelCheck, stringEquality });

  ts.stringEquality()
    .typeCheck()
    .emptyCheck()
    .checkAndExecute(lastNameModel.empty.value === false, () => ts.lteCheck())
    .execute();
};

const lastNameFailureTests = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(configuredCustomRequest, data, lastNameModel, "lastName")
    .maxlength(LAST_NAME_MAXLENGTH_REACH)
    .minlength(LAST_NAME_MINLENGTH_REACH)
    .invalidType_typeIsString(LAST_NAME_INVALID_TYPE);
};

module.exports = {
  lastNameFailureTests,
  lastNameSuccessTests,
};
