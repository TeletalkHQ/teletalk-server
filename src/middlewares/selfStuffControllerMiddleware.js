const { isEqualWithTargetCellphone } = require("@/functions/utilities/utils");
const {
  getCellphone,
  errorThrower,
  getErrorObject,
} = require("@/functions/utilities/utilsNoDeps");

const {
  userErrors: {
    properties: {
      SELF_STUFF: { properties: SELF_STUFF },
    },
  },
} = require("@/variables/errors/userErrors");

const selfStuffControllerMiddleware = (req, res, next) => {
  try {
    const targetCellphone = req.body;

    const cellphone = getCellphone(req.authData.payload);

    errorThrower(isEqualWithTargetCellphone(cellphone, targetCellphone), () =>
      getErrorObject(SELF_STUFF, { targetCellphone })
    );

    next();
  } catch (error) {
    logger.log("selfStuffControllerMiddleware catch", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { selfStuffControllerMiddleware };
