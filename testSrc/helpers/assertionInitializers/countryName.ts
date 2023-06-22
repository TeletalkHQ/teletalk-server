import { models } from "~/models";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

const countryNameAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(models.native.countryName, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .emptyCheck()
    .run();
};

export { countryNameAssertionInitializer };
