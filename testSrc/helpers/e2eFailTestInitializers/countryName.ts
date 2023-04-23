import { randomMaker } from "utility-store";

import { e2eFailTestInitializer } from "$/classes/E2eFailTestInitializer";

import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

import { ERRORS } from "@/variables";

const countryNamemaxLength = models.native.countryName.maxLength.value;

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
    .maxLength()
    .minLength()
    .custom(
      randomMaker.string(countryNamemaxLength),
      ERRORS.COUNTRY_NAME_NOT_SUPPORTED
    );
};

export { countryNameE2eFailTestInitializer };
