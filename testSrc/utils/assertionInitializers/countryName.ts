import { models } from "~/models";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const countryNameAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer()
    .setVariables(models.native.countryName, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .emptyCheck()
    .run();
};
