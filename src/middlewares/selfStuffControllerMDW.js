const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");
const { errorThrower } = require("~/functions/utilities/utils");

const selfStuffControllerMDW = (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.authData.data.payload;

    const { ...targetCellphone } = req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    const { cellphone: userCellphone } = cellphoneFinder({
      cellphones: [cellphone],
      targetCell: targetCellphone,
    });

    errorThrower(userCellphone, {
      ...targetCellphone,
      ...userErrorTemplate.SELF_STUFF,
    });

    next();
  } catch (error) {
    logger.log("selfStuffControllerMDW catch", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { selfStuffControllerMDW };
