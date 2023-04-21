import { validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { errors } from "@/variables/errors";

const compiledSessionValidator = ValidationModelBuilder.compiler(
  models.validation.session
);

export const sessionValidator: Validator = async (session) => {
  //REFACTOR:INVALID_TYPE_ERROR
  const corrected = +session || session;
  const validationResult = await compiledSessionValidator({
    session: corrected,
  });

  validationChecker(
    validationResult,
    {
      extraErrorFields: {
        corrected,
        original: session,
        validated: corrected,
      },
    },
    models.native.session
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.SESSION_INVALID);
  });
};
