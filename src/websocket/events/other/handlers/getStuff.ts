import { enErrorMessages } from "@/translation/messages/enErrorMessages";
import { SocketOnHandler } from "@/types";

import { allStuff } from "@/variables/others/allStuff";

const languages = {
  en: { errorMessages: enErrorMessages },
};

type LanguageKey = keyof typeof languages;

const getAllStuff: SocketOnHandler = (_socket, data) => {
  const { language = "en" } = data;
  const languageData = languages[language as LanguageKey];

  return { ...allStuff, languageData };
};

export { getAllStuff };
