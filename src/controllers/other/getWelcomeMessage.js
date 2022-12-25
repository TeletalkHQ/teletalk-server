const { controllerBuilder } = require("@/classes/ControllerBuilder");

const tryToGetWelcomeMessage = async () => {
  return {
    message: "Hey! Welcome to teletalk <3",
  };
};

const getWelcomeMessage = controllerBuilder
  .create()
  .body(tryToGetWelcomeMessage)
  .build();

module.exports = { getWelcomeMessage };
