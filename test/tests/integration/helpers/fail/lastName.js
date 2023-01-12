const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const lastNameFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.lastName, "lastName")
    .missing()
    .overload()
    .invalidType()
    .maxlength()
    .minlength();
};

module.exports = {
  lastNameFailTest,
};
