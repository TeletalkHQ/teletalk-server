import { failTestHelper } from "$/classes/FailTestHelper";
import { successTestHelper } from "$/classes/SuccessTestHelper";

const testHelper = {
  createFailTest: failTestHelper,
  createSuccessTest: successTestHelper,
};

export { testHelper };
