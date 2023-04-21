import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { errors } from "@/variables/errors";

const validator = ValidationModelBuilder.compiler(
  models.validation.messageText
);

export const messageTextValidator: Validator = async (messageText: unknown) => {
  const validationResult = await validator({
    messageText,
  });
  errorChecker(validationResult, messageText);
};

const errorChecker = (result: Result, messageText: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedMessageText: messageText,
      },
    },
    models.native.messageText
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.MESSAGE_TEXT_INVALID);
  });
};
