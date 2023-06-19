import {
  ValidationResult,
  validationChecker,
} from "~/classes/ValidationChecker";
import { ValidationModelBuilder } from "~/classes/modelBuilder/ValidationModelBuilder";
import { models } from "~/models";
import { Validator } from "~/types";
import { errors } from "~/variables";

const validator = ValidationModelBuilder.compiler(models.validation.firstName);

export const firstNameValidator: Validator = async (firstName: unknown) => {
  const validationResult = await validator(firstName);

  errorChecker(validationResult, firstName);
};

const errorChecker = (result: ValidationResult, firstName: unknown) => {
  validationChecker(result, "firstName", {
    extraErrorFields: {
      validatedFirstName: firstName,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.firstName_invalid);
  });
};
