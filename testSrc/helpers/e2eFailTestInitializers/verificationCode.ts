import { models } from "~/models";
import { errors } from "~/variables";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { randomMaker } from "@/classes/RandomMaker";
import { E2eFailTestInitializer } from "@/types";

export const verificationCodeE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  const builder = e2eFailTestInitializer.create(
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
    errors.verificationCode_invalid
  );
};
