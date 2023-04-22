import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { ERRORS } from "@/variables";

const validator = ValidationModelBuilder.compiler(models.validation.username);

export const usernameValidator: Validator = async (username: unknown) => {
  const validationResult = await validator({ username });

  errorChecker(validationResult, username);
};

const errorChecker = (result: Result, username: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: { validatedUsername: username },
    },
    models.native.username
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(ERRORS.USERNAME_INVALID);
  });
};
