const { chatModels } = require("@/models/chatModels/chatModels");
const { commonModels } = require("@/models/commonModels/commonModels");
const { userModels } = require("@/models/userModels/userModels");
const {
  userValidationModels,
} = require("@/models/validationModels/userValidationModels");
const {
  chatValidationModels,
} = require("@/models/validationModels/chatValidationModels");

const { cellphoneRoutes } = require("@/variables/routes/cellphoneRoutes");
const { otherRoutes } = require("@/variables/routes/otherRoutes");
const { privateChatRoutes } = require("@/variables/routes/privateChatRoutes");
const { userRoutes } = require("@/variables/routes/userRoutes");
const {
  versionControlRoutes,
} = require("@/variables/routes/versionControlRoutes");
const { appErrors } = require("@/variables/errors/appErrors");
const { chatErrors } = require("@/variables/errors/chatErrors");
const { userErrors } = require("@/variables/errors/userErrors");

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
