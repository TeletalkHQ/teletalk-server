import { randomMaker } from "utility-store";

import { models } from "~/models";
import { errors } from "~/variables";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { E2eFailTestInitializer } from "@/types";

const countryNameMaxLength = models.native.countryName.maxLength;

export const countryNameE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data,
  ignores
) => {
  const initializer = e2eFailTestInitializer.create(
    configuredRequester,
    data,
    models.native.countryName,
    "countryName"
  );

  initializer.missing().overload().invalidType().maxLength().minLength();

  if (!ignores?.includes("empty")) {
    initializer
      .empty()
      .custom(
        randomMaker.string(countryNameMaxLength),
        errors.countryNameNotSupported
      );
  }
};
