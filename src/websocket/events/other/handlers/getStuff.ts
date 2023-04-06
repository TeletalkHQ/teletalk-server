import { models } from "@/models";

import { userErrors } from "@/variables/errors/user";

import { enErrorMessages } from "@/translation/messages/enErrorMessages";

import { SocketOnHandler, SocketResponse } from "@/types";

import { routes } from "@/websocket/events";
import { serverErrors } from "@/variables/errors/server";

const languages = {
  en: { errorMessages: enErrorMessages },
};

type LanguageKey = keyof typeof languages;

const getStuff: SocketOnHandler = (_socket, data) => {
  const { language = "en" } = data;
  const languageData = languages[language as LanguageKey];

  const stuff = {
    appErrors: {
      ...userErrors,
      ...serverErrors,
    },
    models: {
      ...models.native.common,
      ...models.native.privateChat,
      ...models.native.user,
    },
    routes,
    validationModels: {
      ...models.validation.chat,
      ...models.validation.common,
      ...models.validation.user,
    },
  };

  return {
    data: {
      ...stuff,
      languageData,
    },
  };
};

export { getStuff };
