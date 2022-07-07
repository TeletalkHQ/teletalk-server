const { isEqualWithTargetCellphone } = require("@/functions/utilities/utils");
const { errorThrower, getErrorObject } = require("@/functions/utilities/utils");
const { userProps } = require("@/classes/UserProps");

const {
  userErrors: { SELF_STUFF },
} = require("@/variables/errors/userErrors");

const selfStuffControllerMiddleware = (req, res, next) => {
  try {
    const targetCellphone = req.body;

    const cellphone = userProps.makeCellphoneByObjectParam(
      req.authData.payload
    );

    errorThrower(isEqualWithTargetCellphone(cellphone, targetCellphone), () =>
      getErrorObject(SELF_STUFF, { targetCellphone })
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
