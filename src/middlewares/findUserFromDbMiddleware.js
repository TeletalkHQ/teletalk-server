const { userFinder } = require("~/functions/helpers/userFinder");
const { errorThrower } = require("~/functions/utilities/utils");

const { userErrorTemplate } = require("~/variables/errors/userErrorTemplate");

const findUserFromDbMiddleware = async (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.authData.payload;

    const cellphone = { phoneNumber, countryCode, countryName };

    const user = await userFinder({ ...cellphone });

    errorThrower(user === null, {
      ...cellphone,
      ...userErrorTemplate.CELLPHONE_NOT_EXIST,
    });

    req.db = { ...req.db, user };

    next();
  } catch (error) {
    logger.log("findUserFromDbMiddleware catch: " + error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { findUserFromDbMiddleware };
