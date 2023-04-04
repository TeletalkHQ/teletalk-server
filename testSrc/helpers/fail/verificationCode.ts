import { failTestBuilder } from "$/classes/FailTestBuilder";
import { randomMaker } from "$/classes/RandomMaker";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

import { errors } from "@/variables/errors";

const userModels = models.native.user;

const verificationCodeFailTest: FailTestExecutor = (
  configuredRequester,
  data = {}
) => {
  const builder = failTestBuilder.create(
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

export { verificationCodeFailTest };
