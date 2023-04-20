import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { errors } from "@/variables/errors";

const validator = ValidationModelBuilder.compiler(
  models.validation.user.username
);

export const usernameValidator = async (username: unknown) => {
  const validationResult = await validator({ username });

  errorChecker(validationResult, username);
};

const errorChecker = (result: Result, username: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: { validatedUsername: username },
    },
    models.native.user.username
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.USERNAME_INVALID);
  });
};
