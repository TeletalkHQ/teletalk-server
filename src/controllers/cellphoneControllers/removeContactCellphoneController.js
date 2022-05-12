const { userProps } = require("@/functions/helpers/UserProps");
const { removeContactItem } = require("@/models/userModels/userModelFunctions");

const removeContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser, body } = req;

    const targetUserData = userProps.getCellphone(body);

    await removeContactItem(currentUser, targetUserData);

    res.checkAndResponse({
      removedContact: targetUserData,
    });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { removeContactCellphoneController };
