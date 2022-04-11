const {
  errorThrower,
  isEqualWithTargetCellphone,
} = require("~/functions/utilities/utils");

const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");

const selfStuffControllerMDW = (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.authData.data.payload;

    const { ...targetCellphone } = req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    errorThrower(isEqualWithTargetCellphone(cellphone, targetCellphone), {
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
