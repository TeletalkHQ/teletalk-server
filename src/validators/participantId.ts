import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { ERRORS } from "@/variables";

const validator = ValidationModelBuilder.compiler(
  models.validation.participantId
);

export const participantIdValidator: Validator = async (
  participantId: unknown
) => {
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
      .throwAnyway(ERRORS.PARTICIPANT_ID_INVALID);
  });
};
