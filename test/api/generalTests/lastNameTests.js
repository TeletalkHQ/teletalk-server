const { successTestBuilder } = require("@/classes/SuccessTestBuilder");
const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models/models");

const { errors } = require("@/variables/errors/errors");
const { testVariables } = require("$/variables/testVariables");

const userModels = models.native.user;

const lastNameSuccessTests = (
  { lastNameMain, lastNameTest } = {},
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariables.successTestDefaultOptions
) => {
  const ts = successTestBuilder
    .create()
    .setVariables(userModels.lastName, lastNameMain, lastNameTest)
    .setOptions({ modelCheck, stringEquality });

  ts.stringEquality()
    .typeCheck()
    .emptyCheck()
    .checkAndExecute(userModels.lastName.empty.value === false, () =>
      ts.lteCheck()
    )
    .execute();
};

const lastNameFailureTests = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(configuredCustomRequest, data, userModels.lastName, "lastName")
    .maxlength(errors.LAST_NAME_MAXLENGTH_REACH)
    .minlength(errors.LAST_NAME_MINLENGTH_REACH)
    .invalidType_typeIsString(errors.LAST_NAME_INVALID_TYPE);
};

module.exports = {
  lastNameFailureTests,
  lastNameSuccessTests,
};
