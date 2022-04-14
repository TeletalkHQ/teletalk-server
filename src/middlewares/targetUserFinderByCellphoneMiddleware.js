const { userFinder } = require("~/functions/helpers/userFinder");
const { errorThrower } = require("~/functions/utilities/utils");

const { userErrorTemplate } = require("~/variables/errors/userErrorTemplate");

const targetUserFinderByCellphoneMiddleware = async (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    const targetUser = await userFinder(cellphone);

    errorThrower(targetUser === null, {
      ...cellphone,
      ...userErrorTemplate.CELLPHONE_NOT_EXIST,
    });

    req.db = { ...req.db, targetUser };

    next();
  } catch (error) {
    logger.log("targetUserFinderByCellphone catch", error);

    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { targetUserFinderByCellphoneMiddleware };
