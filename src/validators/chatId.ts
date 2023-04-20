import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { errors } from "@/variables/errors";

const validator = ValidationModelBuilder.compiler(
  models.validation.chat.chatId
);

export const chatIdValidator = async (chatId: unknown) => {
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
    models.native.privateChat.chatId
  ).check(function () {
    this.required()
      .stringEmpty()
      .string()
      .stringMin()
      .stringMax()
      .throwAnyway(errors.CHAT_ID_INVALID);
  });
};
