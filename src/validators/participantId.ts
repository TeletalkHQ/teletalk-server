import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { errors } from "@/variables/errors";

const validator = ValidationModelBuilder.compiler(
  models.validation.participantId
);

export const participantIdValidator = async (participantId: unknown) => {
  const validationResult = await validator({
    participantId,
  });
  errorChecker(validationResult, participantId);
};

const errorChecker = (result: Result, participantId: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedParticipantId: participantId,
      },
    },
    models.native.participantId
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.PARTICIPANT_ID_INVALID);
  });
};
