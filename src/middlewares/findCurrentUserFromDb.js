const { errorThrower, isNull } = require("@/functions/utilities/utils");
const { userProps } = require("@/classes/UserProps");

const { userFinder } = require("@/models/userModels/userModelFunctions");

const {
  userErrors: { USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const findCurrentUserFromDb = async (req, res, next) => {
  try {
    const cellphone = userProps.getCellphone(req.authData.payload);

    const currentUser = await userFinder(cellphone);

    errorThrower(isNull(currentUser), {
      ...cellphone,
      ...USER_NOT_EXIST,
    });

    req.currentUser = currentUser;

    next();
    return { done: true };
  } catch (error) {
    logger.log("findCurrentUserFromDb catch: ", error);
    res.errorCollector(error);
    res.errorResponser();
    return { done: false };
  }
};

module.exports = { findCurrentUserFromDb };
