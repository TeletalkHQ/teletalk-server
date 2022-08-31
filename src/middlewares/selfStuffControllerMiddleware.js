const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  isDataHasEqualityWithTargetCellphone,
} = require("@/functions/utilities/utils");
const { errorThrower } = require("@/functions/utilities/utils");

const {
  userErrors: { SELF_STUFF },
} = require("@/variables/errors/userErrors");

const selfStuffControllerMiddleware = (req, res, next) => {
  try {
    const targetCellphone = req.body;

    const cellphone = userPropsUtilities.extractCellphone(req.authData.payload);

    errorThrower(
      isDataHasEqualityWithTargetCellphone(cellphone, targetCellphone),
      () => ({ ...SELF_STUFF, targetCellphone })
    );

    next();

    return { ok: true };
  } catch (error) {
    logger.log("selfStuffControllerMiddleware catch", error);
    res.errorCollector(error);
    res.errorResponser();

    return { ok: false };
  }
};

module.exports = { selfStuffControllerMiddleware };
