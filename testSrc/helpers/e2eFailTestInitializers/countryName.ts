import { randomMaker } from "utility-store";

import { models } from "~/models";
import { errors } from "~/variables";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { E2eFailTestInitializer } from "@/types";

const countryNameMaxLength = models.native.countryName.maxLength;

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
      randomMaker.string(countryNameMaxLength),
      errors.countryNameNotSupported
    );
};

export { countryNameE2eFailTestInitializer };
