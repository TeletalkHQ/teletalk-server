const { authManager } = require("@/classes/AuthManager");
const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { temporaryClients } = require("@/classes/TemporaryClients");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToVerify = async (req) => {
  const { authData } = req;
  const cellphone = userPropsUtilities.extractCellphone(authData.payload);
  const foundUser = await services.findOneUser(cellphone);

  if (foundUser) {
    await removeTemporaryClient(foundUser);
    return await responseIfUserExist(foundUser);
  }

  return formatResponseData(
    {
      newUser: true,
    },
    1
  );
};

const responseIfUserExist = async (foundUser) => {
  const { sessions, ...userData } =
    userPropsUtilities.extractUserData(foundUser);

  const token = signToken(userData);
  await addNewToken(userData.userId, token);

  const responseData = {
    ...userData,
    //FIXME: newUser out of userData
    newUser: false,
    token,
  };
  return formatResponseData(responseData, 0);
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

const formatResponseData = (data, requiredFieldsIndex) => {
  return {
    user: data,
    requiredFieldsIndex,
  };
};

const removeTemporaryClient = async (cellphone) => {
  await temporaryClients.remove(cellphone);
};

const verify = controllerBuilder.create().body(tryToVerify).build();

module.exports = { verify };
