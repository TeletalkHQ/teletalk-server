import {
  ValidationResult,
  validationChecker,
} from "@/classes/ValidationChecker";
import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { errors } from "@/variables";

const validator = ValidationModelBuilder.compiler(models.validation.chatId);

export const chatIdValidator: Validator = async (chatId: unknown) => {
  const validationResult = await validator(chatId);
  errorChecker(validationResult, chatId);
};

const errorChecker = (result: ValidationResult, chatId: unknown) => {
  validationChecker(result, "chatId", {
    extraErrorFields: {
      validatedChatId: chatId,
    },
  }).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.chatId_invalid);
  });
};
