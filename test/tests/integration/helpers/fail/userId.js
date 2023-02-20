const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const userIdFailTest = (configuredRequester, data = {}) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.userId, "userId")
    .missing()
    .overload()
    .invalidType()
    .empty.minlength()
    .maxlength();
};

module.exports = {
  userIdFailTest,
};
