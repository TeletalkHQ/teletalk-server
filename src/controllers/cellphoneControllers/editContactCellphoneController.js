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
      body: { firstName, lastName, phoneNumber, countryCode, countryName },
      currentUser,
    } = req;

    const targetUserData = {
      phoneNumber,
      countryCode,
      countryName,
    };

    const editedValues = { firstName, lastName };

    await updateOneContact(currentUser, targetUserData, editedValues);

    res.sendJsonResponse(editContactRoute, {
      phoneNumber,
      countryCode,
      countryName,
      ...editedValues,
    });
  } catch (error) {
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { editContactCellphoneController };
