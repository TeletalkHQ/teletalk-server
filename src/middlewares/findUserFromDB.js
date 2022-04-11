const { userFinder } = require("~/functions/helpers/userFinder");

const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");

const findUserFromDB = async (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.authData.data.payload;

    const cellphone = { phoneNumber, countryCode, countryName };

    const { user } = await userFinder({ ...cellphone });

    if (user === null) {
      const error = { ...cellphone, ...userErrorTemplate.CELLPHONE_NOT_EXIST };
      throw error;
    }

    req.db = { ...req.db, user };

    next();
  } catch (error) {
    logger.log("findUserFromDB catch: " + error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { findUserFromDB };
