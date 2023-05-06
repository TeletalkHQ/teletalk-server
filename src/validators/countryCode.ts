import { customTypeof } from "custom-typeof";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";
import {
  ValidationResult,
  validationChecker,
} from "@/classes/ValidationChecker";

import { models } from "@/models";

import { Validator } from "@/types";

import { errors } from "@/variables";
import { countries } from "@/variables";
import { errorThrower } from "utility-store";

const validator = ValidationModelBuilder.compiler(
  models.validation.countryCode
);

export const countryCodeValidator: Validator = async (countryCode: unknown) => {
  const validationResult = await validator(countryCode);
  errorChecker(validationResult, countryCode);
};

const errorChecker = (result: ValidationResult, countryCode: unknown) => {
  if (result === true) {
    const country = countries.find((c) => c.countryCode === countryCode);
    errorThrower(
      customTypeof.isUndefined(country),
      errors.countryCodeNotSupported
    );

    return;
  }

  validationChecker(result, "countryCode", {
    extraErrorFields: {
      validatedCountryCode: countryCode,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringNumeric()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.countryCode_invalid);
  });
};
