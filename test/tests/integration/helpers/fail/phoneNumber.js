const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { models } = require("@/models");

const userModels = models.native.user;

const phoneNumberFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.phoneNumber, "phoneNumber")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .numeric()
    .minlength()
    .maxlength();
};

module.exports = { phoneNumberFailTest };
