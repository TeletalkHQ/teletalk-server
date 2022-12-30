const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const userModels = models.native.user;

const lastNameFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.lastName, "lastName")
    .maxlength(errors.LAST_NAME_MAXLENGTH_REACH)
    .minlength(errors.LAST_NAME_MINLENGTH_REACH)
    .invalidType_typeIsString(errors.LAST_NAME_INVALID_TYPE);
};

module.exports = {
  lastNameFailTest,
};
