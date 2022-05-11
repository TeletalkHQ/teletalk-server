const { userProps } = require("@/functions/helpers/UserProps");
const { updateOneContact } = require("@/models/userModels/userModelFunctions");
const {
  cellphoneRoutes: { editContactRoute },
} = require("@/variables/routes/cellphoneRoutes");

const editContactCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body,
      body: { firstName, lastName },
      currentUser,
    } = req;

    const targetCellphone = userProps.getCellphone(body);

    const editedValues = { firstName, lastName };

    await updateOneContact(currentUser, targetCellphone, editedValues);

    res.checkAndResponse(editContactRoute, {
      editedContact: { ...targetCellphone, ...editedValues },
    });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { editContactCellphoneController };
