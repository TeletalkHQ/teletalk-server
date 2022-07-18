//!DEPRECATED
//!DEPRECATED
//!DEPRECATED

const { customTypeof } = require("@/classes/CustomTypeof");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { userFinder } = require("@/functions/helpers/userFinder");
const { errorThrower } = require("@/functions/utilities/utils");

const {
  userErrors: { CELLPHONE_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const targetUserFinderByCellphoneMiddleware = async (req, res, next) => {
  try {
    const cellphone = userPropsUtilities.makeCellphoneByObjectParam(req.body);

    const targetUser = await userFinder(cellphone);

    errorThrower(customTypeof.check(targetUser).type.null, {
      ...cellphone,
      ...CELLPHONE_NOT_EXIST,
    });

    req.db = { ...req.db, targetUser };

    next();
  } catch (error) {
    logger.log("targetUserFinderByCellphone catch", error);

    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { targetUserFinderByCellphoneMiddleware };
