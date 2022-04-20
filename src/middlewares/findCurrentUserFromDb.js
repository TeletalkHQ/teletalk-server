const { errorThrower } = require("~/functions/utilities/utilsNoDeps");

const { userFinder } = require("~/models/userModels/userModelFunctions");

const {
  userErrors: {
    properties: { USER_NOT_EXIST },
  },
} = require("~/variables/errors/userErrors");

const findCurrentUserFromDb = async (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName } = req.authData.payload;

    const cellphone = { phoneNumber, countryCode, countryName };

    const currentUser = await userFinder({ ...cellphone });

    errorThrower(currentUser === null, {
      ...cellphone,
      ...USER_NOT_EXIST,
    });

    req.currentUser = currentUser;

    next();
  } catch (error) {
    logger.log("findCurrentUserFromDb catch: ", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { findCurrentUserFromDb };
