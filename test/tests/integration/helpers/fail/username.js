const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const usernameFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.username, "username")
    .missing()
    .overload()
    .invalidType()
    .minlength()
    .maxlength();
};

module.exports = { usernameFailTest };
