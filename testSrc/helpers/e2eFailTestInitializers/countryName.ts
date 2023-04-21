import { randomMaker } from "utility-store";

import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

import { errors } from "@/variables/errors";

const countryNameMaxlength = models.native.countryName.maxlength.value;

const countryNameE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  e2eFailTestInitializer
    .create(configuredRequester, data, models.native.countryName, "countryName")
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

export { countryNameE2eFailTestInitializer };
