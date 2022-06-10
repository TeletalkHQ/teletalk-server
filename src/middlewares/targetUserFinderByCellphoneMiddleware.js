//!DEPRECATED
//!DEPRECATED
//!DEPRECATED

const { userFinder } = require("@/functions/helpers/userFinder");
const { errorThrower, isNull } = require("@/functions/utilities/utils");
const { userProps } = require("@/classes/UserProps");

const {
  userErrors: { CELLPHONE_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const targetUserFinderByCellphoneMiddleware = async (req, res, next) => {
  try {
    const cellphone = userProps.getCellphone(req.body);

    const targetUser = await userFinder(cellphone);

    errorThrower(isNull(targetUser), {
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
