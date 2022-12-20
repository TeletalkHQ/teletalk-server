const { enErrorMessages } = require("@/translation/messages/enErrorMessages");

const { allStuff } = require("@/variables/others/allStuff");
const { controllerBuilder } = require("@/classes/ControllerBuilder");

const languages = {
  en: { errorMessages: enErrorMessages },
};

const tryToGetAllStuff = (req) => {
  const { language = "en" } = req.body;

  const languageData = languages[language];
  return { ...allStuff, languageData };
};

const responseToGetAllStuff = (data, res) => {
  res.sendJsonResponse(data);
};

const getAllStuff = controllerBuilder
  .create()
  .body(tryToGetAllStuff)
  .response(responseToGetAllStuff)
  .build();

module.exports = { getAllStuff };
