import {
  ValidationResult,
  validationChecker,
} from "~/classes/ValidationChecker";
import { ValidationModelBuilder } from "~/classes/modelBuilder/ValidationModelBuilder";
import { models } from "~/models";
import { Validator } from "~/types";
import { errors } from "~/variables";

const validator = ValidationModelBuilder.compiler(models.validation.clientId);

export const clientIdValidator: Validator = async (clientId) => {
  const validationResult = await validator(clientId);

  errorChecker(validationResult, clientId);
};

const errorChecker = (result: ValidationResult, clientId: unknown) => {
  validationChecker(result, "clientId", {
    extraErrorFields: {
      validatedClientId: clientId,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.clientId_invalid);
  });
};
