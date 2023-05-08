import { validationChecker } from "@/classes/ValidationChecker";
import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { errors } from "@/variables";

const compiledSessionValidator = ValidationModelBuilder.compiler(
  models.validation.session
);

export const sessionValidator: Validator = async (session) => {
  //REFACTOR:INVALID_TYPE_ERROR
  const corrected = +session || session;
  const validationResult = await compiledSessionValidator(corrected);

  validationChecker(validationResult, "session", {
    extraErrorFields: {
      corrected,
      original: session,
      validated: corrected,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.session_invalid);
  });
};
