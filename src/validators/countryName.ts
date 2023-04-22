import { customTypeof } from "custom-typeof";
import { Result, errorThrower, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { ERRORS } from "@/variables";
import { countries } from "@/variables";

const validator = ValidationModelBuilder.compiler(
  models.validation.countryName
);

export const countryNameValidator: Validator = async (countryName: unknown) => {
  const validationResult = await validator({
    countryName,
  });
  errorChecker(validationResult, countryName);
};

const errorChecker = (result: Result, countryName: unknown) => {
  if (result === true) {
    const country = countries.find((c) => c.countryName === countryName);
    errorThrower(
      customTypeof.isUndefined(country),
      ERRORS.COUNTRY_NAME_NOT_SUPPORTED
    );

    return;
  }

  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedCountryName: countryName,
      },
    },
    models.native.countryName
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMax()
      .stringMin()
      .throwAnyway(ERRORS.COUNTRY_NAME_INVALID);
  });
};
