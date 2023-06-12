import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "~/models";

import { AssertionInitializer } from "$/types";

export const clientIdAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  const builder = assertionInitializer
    .create()
    .setVariables(models.native.clientId, equalValue, testValue)
    .setOptions(options);

  builder.typeCheck().gteCheck().lteCheck().stringEquality();

  builder.run();
};
