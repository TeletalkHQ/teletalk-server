import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";
import { randomMaker } from "$/classes/RandomMaker";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

import { errors } from "@/variables";

const verificationCodeE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
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

export { verificationCodeE2eFailTestInitializer };
