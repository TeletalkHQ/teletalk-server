const { failTestHelper } = require("$/classes/FailTestHelper");
const { successTestHelper } = require("$/classes/SuccessTestHelper");

const testHelper = {
  createFailTest: failTestHelper,
  createSuccessTest: successTestHelper,
};

module.exports = {
  testHelper,
};
