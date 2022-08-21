const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  isDataHasEqualityWithTargetCellphone,
} = require("@/functions/utilities/utils");
const { errorThrower, getErrorObject } = require("@/functions/utilities/utils");

const {
  userErrors: { SELF_STUFF },
} = require("@/variables/errors/userErrors");

const selfStuffControllerMiddleware = (req, res, next) => {
  try {
    const targetCellphone = req.body;

    const cellphone = userPropsUtilities.extractCellphone(req.authData.payload);

    errorThrower(
      isDataHasEqualityWithTargetCellphone(cellphone, targetCellphone),
      () => getErrorObject(SELF_STUFF, { targetCellphone })
    );

    next();

    return { done: true };
  } catch (error) {
    logger.log("selfStuffControllerMiddleware catch", error);
    res.errorCollector(error);
    res.errorResponser();

    return { done: false };
  }
};

module.exports = { selfStuffControllerMiddleware };
