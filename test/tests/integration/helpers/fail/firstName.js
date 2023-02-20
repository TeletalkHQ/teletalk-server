const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const firstNameFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.firstName, "firstName")
    .missing()
    .overload()
    .invalidType()
    .empty.minlength()
    .maxlength();
};

module.exports = { firstNameFailTest };
