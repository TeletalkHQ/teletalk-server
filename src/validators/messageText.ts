import {
  ValidationResult,
  validationChecker,
} from "@/classes/ValidationChecker";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { errors } from "@/variables";

const validator = ValidationModelBuilder.compiler(
  models.validation.messageText
);

export const messageTextValidator: Validator = async (messageText: unknown) => {
  const validationResult = await validator(messageText);
  errorChecker(validationResult, messageText);
};

const errorChecker = (result: ValidationResult, messageText: unknown) => {
  validationChecker(result, "messageText", {
    extraErrorFields: {
      validatedMessageText: messageText,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.messageText_invalid);
  });
};
