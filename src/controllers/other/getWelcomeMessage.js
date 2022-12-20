const { controllerBuilder } = require("@/classes/ControllerBuilder");

const tryToGetWelcomeMessage = async () => {
  return {
    //TODO: Add tests, move message to statics
    message: "Hey! Welcome to teletalk <3",
  };
};

const getWelcomeMessage = controllerBuilder
  .create()
  .body(tryToGetWelcomeMessage)
  .build();

module.exports = { getWelcomeMessage };
