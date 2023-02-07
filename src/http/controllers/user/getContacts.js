const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToGetContacts = async (req) => {
  const { currentUserId } = req;

  const contacts = await services.getUserContacts().run({ currentUserId });

  return {
    contacts,
  };
};

const getContacts = controllerBuilder.create().body(tryToGetContacts).build();

module.exports = { getContacts };
