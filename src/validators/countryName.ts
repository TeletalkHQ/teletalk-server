import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store";

import { ValidationModelBuilder } from "~/classes/modelBuilder/ValidationModelBuilder";
import {
  ValidationResult,
  validationChecker,
} from "~/classes/ValidationChecker";

import { models } from "~/models";

import { Validator } from "~/types";

import { errors } from "~/variables";
import { countries } from "~/variables";

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
      errors.countryNameNotSupported
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
      .throwAnyway(errors.countryName_invalid);
  });
};
