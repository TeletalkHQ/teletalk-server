import { randomMaker } from "utility-store";

import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

import { errors } from "@/variables/errors";

const userModels = models.native.user;

const countryNameMaxlength = userModels.countryName.maxlength.value;

const countryNameFailTest: FailTestExecutor = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.countryName, "countryName")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .maxlength()
    .minlength()
    .custom(
      randomMaker.string(countryNameMaxlength),
      errors.COUNTRY_NAME_NOT_SUPPORTED
    );
};

export { countryNameFailTest };
