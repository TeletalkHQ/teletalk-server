import { enErrorMessages } from "@/translation/messages/enErrorMessages";

import { allStuff } from "@/variables/others/allStuff";

const languages = {
  en: { errorMessages: enErrorMessages },
};

const getAllStuff = (_socket, data) => {
  const { language = "en" } = data;

  const languageData = languages[language];
  return { ...allStuff, languageData };
};

export { getAllStuff };
