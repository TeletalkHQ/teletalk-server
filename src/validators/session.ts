import { validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";
import { authManager } from "@/classes/AuthManager";

import { models } from "@/models";

import { errors } from "@/variables/errors";

const compiledSessionValidator = ValidationModelBuilder.compiler(
  models.validation.session
);

export const sessionValidator = async (
  session: string,
  secret = authManager.getMainSecret()
) => {
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

  return authManager.verify(session, secret);
};
