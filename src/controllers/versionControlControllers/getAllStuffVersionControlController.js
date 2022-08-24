const { enErrorMessages } = require("@/translate/messages/enErrorMessages");

const { allStuff } = require("@/variables/others/allStuff");

const languages = {
  en: { errorMessages: enErrorMessages },
};

const getAllStuffVersionControlController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { language = "en" } = req.body;

    const languageData = languages[language];

    logger.log("rm", languageData, "languageData");
    logger.log("rm", language, "language");
    //TODO Update with checkAndResponse ?!
    res.status(200).json({ ...allStuff, languageData });
  } catch (error) {
    logger.log("getAllStuffVersionControlController catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { getAllStuffVersionControlController };
