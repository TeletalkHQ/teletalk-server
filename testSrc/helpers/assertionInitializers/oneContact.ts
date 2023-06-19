import { fullNameAssertionInitializer } from "@/helpers/assertionInitializers/fullName";
import { userIdAssertionInitializer } from "@/helpers/assertionInitializers/userId";
import { AssertionInitializer } from "@/types";

const oneContactAssertionInitializer: AssertionInitializer = ({
  equalValue,
  testValue,
}) => {
  fullNameAssertionInitializer({ equalValue, testValue });

  userIdAssertionInitializer({
    equalValue: equalValue.userId,
    testValue: testValue.userId,
  });
};

export { oneContactAssertionInitializer };
