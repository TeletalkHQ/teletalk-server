const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const bioFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.bio, "bio")
    .missing()
    .overload()
    .invalidType()
    .maxlength();
};

module.exports = { bioFailTest };
