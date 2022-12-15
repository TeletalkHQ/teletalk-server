const { commonServices } = require("@/services/common");

const saveNewToken = async (cellphone, newToken) => {
  //FIXME: Use id instead
  const user = await commonServices.userFinder(cellphone);
  user.sessions.push({ token: newToken });
  await user.save();
};
