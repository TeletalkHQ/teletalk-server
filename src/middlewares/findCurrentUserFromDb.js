const { customTypeof } = require("@/classes/CustomTypeof");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower, getErrorObject } = require("@/functions/utilities/utils");

const { userFinder } = require("@/models/userModels/userModelFunctions");

const {
  userErrors: { USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const findCurrentUserFromDb = async (req, res, next) => {
  try {
    const cellphone = userPropsUtilities.makeCellphoneByObjectParam(
      req.authData.payload
    );

    const currentUser = await userFinder(cellphone, {});

    //TODO Add tests when user not exist
    errorThrower(customTypeof.check(currentUser).type.null, () =>
      getErrorObject(USER_NOT_EXIST, cellphone)
    );

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
