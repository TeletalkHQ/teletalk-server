const {
  chatIDValidationModel,
} = require("~/models/validationModels/chatValidationModels/chatIDValidationModel");
const {
  messageIDValidationModel,
} = require("~/models/validationModels/chatValidationModels/messageIDValidationModel");
const {
  messageTextValidationModel,
} = require("~/models/validationModels/chatValidationModels/messageTextValidationModel");
const {
  participantIDValidationModel,
} = require("~/models/validationModels/chatValidationModels/participantIDValidationModel");
const {
  createdAtValidationModel,
} = require("~/models/validationModels/commonValidationModels/createdAtValidationModel");
const {
  bioValidationsModel,
} = require("~/models/validationModels/userValidationModels/bioValidationsModel");
const {
  countryCodeValidationModel,
} = require("~/models/validationModels/userValidationModels/countryCodeValidationModel");
const {
  countryNameValidationModel,
} = require("~/models/validationModels/userValidationModels/countryNameValidationModel");
const {
  firstNameValidationModel,
} = require("~/models/validationModels/userValidationModels/firstNameValidationModel");
const {
  lastNameValidationModel,
} = require("~/models/validationModels/userValidationModels/lastNameValidationModel");
const {
  macAddressValidationModel,
} = require("~/models/validationModels/userValidationModels/macAddressValidationModel");
const {
  phoneNumberValidationModel,
} = require("~/models/validationModels/userValidationModels/phoneNumberValidationModel");
const {
  privateIDValidationModel,
} = require("~/models/validationModels/userValidationModels/privateIDValidationModel");
const {
  usernameValidationModel,
} = require("~/models/validationModels/userValidationModels/usernameValidationModel");
const {
  verificationCodeValidationModel,
} = require("~/models/validationModels/userValidationModels/verificationCodeValidationModel");

const { cellphoneRoutes } = require("~/variables/routes/cellphoneRoutes");
const { otherRoutes } = require("~/variables/routes/otherRoutes");
const { privateChatRoutes } = require("~/variables/routes/privateChatRoutes");
const { userRoutes } = require("~/variables/routes/userRoutes");
const {
  versionControlRoutes,
} = require("~/variables/routes/versionControlRoutes");

const { chatModel } = require("~/models/chatModels/chat.model");
const { commonModel } = require("~/models/commonModels/common.model");
const { userModel } = require("~/models/userModels/user.model");
const { userErrorTemplate } = require("~/variables/errors/userErrorTemplate");
const { chatErrorTemplate } = require("~/variables/errors/chatErrorTemplate");

const routerTemplates = {
  cellphoneRoutes,
  otherRoutes,
  privateChatRoutes,
  userRoutes,
  versionControlRoutes,
};

const models = {
  chatModel,
  commonModel,
  userModel,
};

const errorTemplates = {
  chatErrorTemplate,
  userErrorTemplate,
};

const validationSchemas = {
  bioValidationsModel,
  chatIDValidationModel,
  countryCodeValidationModel,
  countryNameValidationModel,
  createdAtValidationModel,
  firstNameValidationModel,
  lastNameValidationModel,
  macAddressValidationModel,
  messageIDValidationModel,
  messageTextValidationModel,
  participantIDValidationModel,
  phoneNumberValidationModel,
  privateIDValidationModel,
  usernameValidationModel,
  verificationCodeValidationModel,
};

const allStuff = {
  templates: { models, routerTemplates, errorTemplates },
  schemas: {
    validationSchemas,
  },
};

module.exports = {
  allStuff,
  models,
  routerTemplates,
  validationSchemas,
};
