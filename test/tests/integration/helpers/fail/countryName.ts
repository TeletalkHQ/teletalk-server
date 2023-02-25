import { randomMaker } from "utility-store/src/classes/RandomMaker";

import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

const userModels = models.native.user;

import { errors } from "@/variables/errors";

const countryNameMaxlength = userModels.countryName.maxlength.value;

const countryNameFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.countryName, "countryName")
    .missing()
    .overload()
    .invalidType()
    .empty.maxlength()
    .minlength()
    .custom(
      randomMaker.string(countryNameMaxlength),
      errors.COUNTRY_NAME_NOT_SUPPORTED
    );
};

export { countryNameFailTest };
