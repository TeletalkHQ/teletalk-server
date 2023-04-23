import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { Validator } from "@/types";

import { ERRORS } from "@/variables";

const validator = ValidationModelBuilder.compiler(models.validation.chatId);

export const chatIdValidator: Validator = async (chatId: unknown) => {
  const validationResult = await validator({ chatId });
  errorChecker(validationResult, chatId);
};

const errorChecker = (result: Result, chatId: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedChatId: chatId,
      },
    },
    models.native.chatId
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(ERRORS.CHAT_ID_INVALID);
  });
};
