const { authManager } = require("@/classes/AuthManager");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToVerify = async (req) => {
  const {
    authData: { payload: tokenPayload },
  } = req;

  const cellphone = userPropsUtilities.extractCellphone(tokenPayload);

  const foundUser = (await services.findOneUser(cellphone)) || {};

  const userData = userPropsUtilities.extractUserData(foundUser);

  const isUserExist = !!userData.userId;
  const responseData = await fixUserData(isUserExist, userData);
  //? 0 stance for newUser:false and 1 for newUser:true
  const requiredFieldsIndex = isUserExist ? 0 : 1;

  return {
    requiredFieldsIndex,
    ...responseData,
  };
};

const signToken = (userData) => {
  return authManager.signToken({
    ...userPropsUtilities.extractCellphone(userData),
    userId: userData.userId,
  });
};

const addNewToken = async (userId, newToken) => {
  await services.addNewToken().run({
    newToken,
    userId,
  });
};

const dataIfUserExist = async ({ sessions, ...userData }) => {
  const newToken = signToken(userData);
  await addNewToken(userData.userId, newToken);

  return {
    ...userData,
    newUser: false,
    token: newToken,
  };
};
const dataIfUserNotExist = () => ({
  newUser: true,
});

const fixUserData = async (isUserExist, userData) => {
  return {
    user: isUserExist ? await dataIfUserExist(userData) : dataIfUserNotExist(),
  };
};

const verify = controllerBuilder.create().body(tryToVerify).build();

module.exports = { verify };
