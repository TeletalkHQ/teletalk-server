import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { randomMaker } from "@/classes/RandomMaker";
import { E2eFailTestInitializer } from "@/types";

export const verificationCodeE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  const builder = e2eFailTestInitializer(
    configuredRequester,
    data,
    models.native.verificationCode,
    "verificationCode"
  );
  builder
    .missing()
    .overload()
    .invalidType()
    .empty()
    .numeric()
    .length(
      randomMaker.stringNumber(models.native.verificationCode.length + 1)
    );

  builder.custom(
    randomMaker.stringNumber(models.native.verificationCode.length),
    errorStore.find("VERIFICATION_CODE_INVALID")
  );
};
