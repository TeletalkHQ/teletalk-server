const { failTestBuilder } = require("@/classes/FailTestBuilder");

const { models } = require("@/models");

const { errors } = require("@/variables/errors");

const userModels = models.native.user;

const lastName = (configuredCustomRequest, data) => {
  failTestBuilder
    .create(configuredCustomRequest, data, userModels.lastName, "lastName")
    .maxlength(errors.LAST_NAME_MAXLENGTH_REACH)
    .minlength(errors.LAST_NAME_MINLENGTH_REACH)
    .invalidType_typeIsString(errors.LAST_NAME_INVALID_TYPE);
};

module.exports = {
  lastName,
};
