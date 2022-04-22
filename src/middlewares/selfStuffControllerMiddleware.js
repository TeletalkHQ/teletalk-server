const {
  errorThrower,
  isEqualWithTargetCellphone,
} = require("~/functions/utilities/utils");
const { getCellphone } = require("~/functions/utilities/utilsNoDeps");

const {
  userErrors: {
    properties: { SELF_STUFF },
  },
} = require("~/variables/errors/userErrors");

const selfStuffControllerMiddleware = (req, res, next) => {
  try {
    const targetCellphone = req.body;

    const cellphone = getCellphone(req.authData.payload);

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
