const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToUpdatePersonalInfo = async (req) => {
  const {
    body: { firstName, lastName },
    currentUserId,
  } = req;

  await services.updatePersonalInfo().run({
    currentUserId,
    firstName,
    lastName,
  });

  return {
    user: {
      firstName,
      lastName,
    },
  };
};

const updatePersonalInfoController = controllerBuilder
  .create()
  .body(tryToUpdatePersonalInfo)
  .build();

module.exports = {
  updatePersonalInfo: updatePersonalInfoController,
};
