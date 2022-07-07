const { customTypeof } = require("@/classes/CustomTypeof");

const { errorThrower } = require("@/functions/utilities/utils");
const { userProps } = require("@/classes/UserProps");

const { userFinder } = require("@/models/userModels/userModelFunctions");

const {
  userErrors: { USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const findCurrentUserFromDb = async (req, res, next) => {
  try {
    const cellphone = userProps.makeCellphoneByParam(req.authData.payload);

    const currentUser = await userFinder(cellphone, {});

    errorThrower(customTypeof.check(currentUser).type.null, {
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
