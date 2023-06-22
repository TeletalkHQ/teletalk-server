import {
  ValidationResult,
  validationChecker,
} from "~/classes/ValidationChecker";
import { ValidationModelBuilder } from "~/classes/modelBuilder/ValidationModelBuilder";
import { models } from "~/models";
import { Validator } from "~/types";
import { errors } from "~/variables";

const validator = ValidationModelBuilder.compiler(
  models.validation.participantId
);

export const participantIdValidator: Validator = async (
  participantId: unknown
) => {
  const validationResult = await validator(participantId);
  errorChecker(validationResult, participantId);
};

const errorChecker = (result: ValidationResult, participantId: unknown) => {
  validationChecker(result, "participantId", {
    extraErrorFields: {
      validatedParticipantId: participantId,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.participantId_invalid);
  });
};
