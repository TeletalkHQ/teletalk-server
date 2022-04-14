const {
  errorThrower,
  isEqualWithTargetCellphone,
} = require("~/functions/utilities/utils");

const { userErrorTemplate } = require("~/variables/errors/userErrorTemplate");

const selfStuffControllerMiddleware = (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.authData.payload;

    const { ...targetCellphone } = req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    errorThrower(isEqualWithTargetCellphone(cellphone, targetCellphone), {
      ...targetCellphone,
      ...userErrorTemplate.SELF_STUFF,
    });

    next();
  } catch (error) {
    logger.log("selfStuffControllerMiddleware catch", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { selfStuffControllerMiddleware };
