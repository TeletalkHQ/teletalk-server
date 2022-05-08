const { getCellphone } = require("@/functions/utilities/utilsNoDeps");
const { updateOneContact } = require("@/models/userModels/userModelFunctions");
const {
  cellphoneRoutes: {
    properties: {
      editContactRoute: { properties: editContactRoute },
    },
  },
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

    const targetCellphone = getCellphone(body);

    const editedValues = { firstName, lastName };

    await updateOneContact(currentUser, targetCellphone, editedValues);

    res.sendJsonResponse(editContactRoute, {
      editedContact: { ...targetCellphone, ...editedValues },
    });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { editContactCellphoneController };
