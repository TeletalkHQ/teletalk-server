import { customTypeof } from "custom-typeof";
import { Result, errorThrower, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { ERRORS } from "@/variables";
import { countries } from "@/variables/others/countries";

const validator = ValidationModelBuilder.compiler(
  models.validation.countryCode
);

export const countryCodeValidator: Validator = async (countryCode: unknown) => {
  const validationResult = await validator({
    countryCode,
  });
  errorChecker(validationResult, countryCode);
};

const errorChecker = (result: Result, countryCode: unknown) => {
  if (result === true) {
    const country = countries.find((c) => c.countryCode === countryCode);
    errorThrower(
      customTypeof.isUndefined(country),
      ERRORS.COUNTRY_CODE_NOT_SUPPORTED
    );

    return;
  }

  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedCountryCode: countryCode,
      },
    },
    models.native.countryCode
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringNumeric()
      .stringMin()
      .stringMax()
      .throwAnyway(ERRORS.COUNTRY_CODE_INVALID);
  });
};
