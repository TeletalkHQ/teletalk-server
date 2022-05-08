const {
  errorThrower,
  getCellphone,
} = require("@/functions/utilities/utilsNoDeps");

const { userFinder } = require("@/models/userModels/userModelFunctions");

const {
  userErrors: { USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const findCurrentUserFromDb = async (req, res, next) => {
  try {
    const cellphone = getCellphone(req.authData.payload);

    const currentUser = await userFinder(cellphone);

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
