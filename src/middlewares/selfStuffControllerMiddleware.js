const {
  errorThrower,
  isEqualWithTargetCellphone,
} = require("~/functions/utilities/utils");

const {
  userErrors: {
    properties: { SELF_STUFF },
  },
} = require("~/variables/errors/userErrors");

const selfStuffControllerMiddleware = (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.authData.payload;

    const targetCellphone = req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    errorThrower(isEqualWithTargetCellphone(cellphone, targetCellphone), {
      ...targetCellphone,
      ...SELF_STUFF,
    });

    next();
  } catch (error) {
    logger.log("selfStuffControllerMiddleware catch", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { selfStuffControllerMiddleware };
