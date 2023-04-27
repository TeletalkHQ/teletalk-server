import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";
import {
  ValidationResult,
  validationChecker,
} from "@/classes/ValidationChecker";

import { models } from "@/models";

import { Validator } from "@/types";

import { ERRORS } from "@/variables";
import { countries } from "@/variables";

const validator = ValidationModelBuilder.compiler(
  models.validation.countryName
);

export const countryNameValidator: Validator = async (countryName: unknown) => {
  const validationResult = await validator(countryName);
  errorChecker(validationResult, countryName);
};

const errorChecker = (result: ValidationResult, countryName: unknown) => {
  if (result === true) {
    const country = countries.find((c) => c.countryName === countryName);
    errorThrower(
      customTypeof.isUndefined(country),
      ERRORS.COUNTRY_NAME_NOT_SUPPORTED
    );

    return;
  }

  validationChecker(result, "countryName", {
    extraErrorFields: {
      validatedCountryName: countryName,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMax()
      .stringMin()
      .throwAnyway(ERRORS.COUNTRY_NAME_INVALID);
  });
};
