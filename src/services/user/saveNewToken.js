const { commonServices } = require("@/services/common");

const saveNewToken = async (cellphone, newToken) => {
  //FIXME: Use id instead
  const user = await commonServices.findUser(cellphone);
  user.sessions.push({ token: newToken });
  await user.save();
};

module.exports = { saveNewToken };
