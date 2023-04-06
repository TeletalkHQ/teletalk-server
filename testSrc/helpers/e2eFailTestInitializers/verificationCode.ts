import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";
import { randomMaker } from "$/classes/RandomMaker";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

import { errors } from "@/variables/errors";

const userModels = models.native.user;

const verificationCodeE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  const builder = e2eFailTestInitializer.create(
    configuredRequester,
    data,
    userModels.verificationCode,
    "verificationCode"
  );
  builder
    .missing()
    .overload()
    .invalidType()
    .empty()
    .numeric()
    .length(
      randomMaker.stringNumber(userModels.verificationCode.length.value + 1)
    );

  builder.custom(
    randomMaker.stringNumber(userModels.verificationCode.length.value),
    errors.VERIFICATION_CODE_INVALID
  );
};

export { verificationCodeE2eFailTestInitializer };
