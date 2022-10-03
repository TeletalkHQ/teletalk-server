const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { enErrorMessages } = require("@/translate/messages/enErrorMessages");

const { allStuff } = require("@/variables/others/allStuff");

const languages = {
  en: { errorMessages: enErrorMessages },
};

const tryToGetAllStuff = (language) => {
  const languageData = languages[language];
  return { ...allStuff, languageData };
};

const responseToGetAllStuff = (data, res) => {
  res.sendJsonResponse(data);
};

const catchGetAllStuff = commonFunctionalities.controllerCatchResponse;

const getAllStuff = async (req = expressRequest, res = expressResponse) => {
  const { language = "en" } = req.body;
  trier(getAllStuff.name)
    .try(tryToGetAllStuff, language)
    .executeIfNoError(responseToGetAllStuff, res)
    .catch(catchGetAllStuff, res);
};

module.exports = { getAllStuff };
