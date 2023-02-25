import { failTestBuilder } from "$/classes/FailTestBuilder";
import { randomMaker } from "$/classes/RandomMaker";

import { getWrongCountryCode } from "$/utilities";

import { models } from "@/models";

const userModels = models.native.user;

import { errors } from "@/variables/errors";

const countryCodeFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.countryCode, "countryCode")
    .missing()
    .overload()
    .invalidType()
    .empty.numeric()
    .minlength()
    .maxlength(
      randomMaker.stringNumber(userModels.countryCode.maxlength.value + 1)
    )
    .custom(getWrongCountryCode(), errors.COUNTRY_CODE_NOT_SUPPORTED);
};

export { countryCodeFailTest };
