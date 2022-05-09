//!DEPRECATED
//!DEPRECATED
//!DEPRECATED

const { userFinder } = require("@/functions/helpers/userFinder");
const { errorThrower } = require("@/functions/utilities/utilsNoDeps");
const { userProps } = require("@/functions/helpers/UserProps");

const {
  userErrors: { CELLPHONE_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const targetUserFinderByCellphoneMiddleware = async (req, res, next) => {
  try {
    const cellphone = userProps.getCellphone(req.body);

    const targetUser = await userFinder(cellphone);

    errorThrower(targetUser === null, {
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
