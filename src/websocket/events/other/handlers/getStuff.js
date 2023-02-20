const { enErrorMessages } = require("@/translation/messages/enErrorMessages");

const { allStuff } = require("@/variables/others/allStuff");

const languages = {
  en: { errorMessages: enErrorMessages },
};

const getAllStuff = (_socket, data) => {
  const { language = "en" } = data;

  const languageData = languages[language];
  return { ...allStuff, languageData };
};

module.exports = { getAllStuff };
