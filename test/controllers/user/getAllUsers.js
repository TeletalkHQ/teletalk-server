const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToGetAllUsers = async () => {
  const users = await services.getAllUsers().run();
  return { users };
};

const getAllUsers = controllerBuilder.create().body(tryToGetAllUsers).build();

module.exports = { getAllUsers };
