const { chatModels } = require("@/models/dataModels/chatModels");
const { commonModels } = require("@/models/dataModels/commonModels");
const { userModels } = require("@/models/dataModels/userModels");
const {
  chatValidationModels,
} = require("@/models/validationModels/chatValidationModels");
const {
  userValidationModels,
} = require("@/models/validationModels/userValidationModels");

const { appErrors } = require("@/variables/errors/appErrors");
const { cellphoneRoutes } = require("@/variables/routes/cellphoneRoutes");
const { chatErrors } = require("@/variables/errors/chatErrors");
const { otherRoutes } = require("@/variables/routes/otherRoutes");
const { privateChatRoutes } = require("@/variables/routes/privateChatRoutes");
const { userErrors } = require("@/variables/errors/userErrors");
const { userRoutes } = require("@/variables/routes/userRoutes");
const {
  versionControlRoutes,
} = require("@/variables/routes/versionControlRoutes");

const routes = {
  ...cellphoneRoutes,
  ...otherRoutes,
  ...privateChatRoutes,
  ...userRoutes,
  ...versionControlRoutes,
};

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
  routes,
  validationModels,
};

module.exports = {
  allStuff,
  errors,
  models,
  routes,
};
