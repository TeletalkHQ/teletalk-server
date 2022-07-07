const { userProps } = require("@/classes/UserProps");
const { removeContactItem } = require("@/models/userModels/userModelFunctions");

const removeContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const { currentUser, body } = req;

    const targetUserData = userProps.makeCellphoneByParam(body);

    await removeContactItem(currentUser, targetUserData);

    res.checkDataAndResponse({
      removedContact: targetUserData,
    });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { removeContactCellphoneController };
