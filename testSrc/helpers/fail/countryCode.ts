import { failTestBuilder } from "$/classes/FailTestBuilder";
import { randomMaker } from "$/classes/RandomMaker";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

import { utilities } from "$/utilities";

import { errors } from "@/variables/errors";

const userModels = models.native.user;

const countryCodeFailTest: FailTestExecutor = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.countryCode, "countryCode")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .numeric()
    .minlength()
    .maxlength(
      randomMaker.stringNumber(userModels.countryCode.maxlength.value + 1)
    )
    .custom(utilities.getWrongCountryCode(), errors.COUNTRY_CODE_NOT_SUPPORTED);
};

export { countryCodeFailTest };
