const { chatModels } = require("@/models/dataModels/chatModels");
const { commonModels } = require("@/models/dataModels/commonModels");
const { userModels } = require("@/models/dataModels/userModels");
const {
  chatValidationModels,
} = require("@/models/validationModels/chatValidationModels");
const {
  userValidationModels,
} = require("@/models/validationModels/userValidationModels");

const { routes } = require("@/routes/routes");

const { appErrors } = require("@/variables/errors/appErrors");
const { chatErrors } = require("@/variables/errors/chatErrors");
const { userErrors } = require("@/variables/errors/userErrors");

const models = {
  ...chatModels,
  ...commonModels,
  ...userModels,
};

const validationModels = {
  ...chatValidationModels,
  ...userValidationModels,
};

const errors = {
  ...appErrors,
  ...chatErrors,
  ...userErrors,
};

const allStuff = {
  errors,
  models,
  routes: {
    ...routes.cellphone,
    ...routes.other,
    ...routes.privateChat,
    ...routes.test,
    ...routes.user,
    ...routes.versionControl,
  },
  validationModels,
};

module.exports = {
  allStuff,
  errors,
  models,
  routes,
};
