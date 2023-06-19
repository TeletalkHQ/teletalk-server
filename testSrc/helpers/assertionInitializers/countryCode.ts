import { models } from "~/models";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

const countryCodeAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(models.native.countryCode, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .emptyCheck()
    .numericCheck()
    .run();
};

export { countryCodeAssertionInitializer };
