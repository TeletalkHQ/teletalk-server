import { randomMaker } from "utility-store";

import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";

import { e2eFailTestInitializer } from "@/classes/E2eFailTestInitializer";
import { E2eFailTestInitializer } from "@/types";

const countryNameMaxLength = models.native.countryName.maxLength;

export const countryNameE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data,
  ignores
) => {
  const initializer = e2eFailTestInitializer(
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
        errorStore.find("COUNTRY_NAME_NOT_SUPPORTED")
      );
  }
};
