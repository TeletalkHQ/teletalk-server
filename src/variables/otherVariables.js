const {
  chatIdValidationModel: chatIDValidationModel,
} = require("~/models/validationModels/chatValidationModels/chatIdValidationModel");
const {
  messageIdValidationModel: messageIDValidationModel,
} = require("~/models/validationModels/chatValidationModels/messageIdValidationModel");
const {
  messageTextValidationModel,
} = require("~/models/validationModels/chatValidationModels/messageTextValidationModel");
const {
  participantIdValidationModel,
} = require("~/models/validationModels/chatValidationModels/participantIdValidationModel");
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

const { chatModel } = require("~/models/chatModels/chatModel");
const { commonModel } = require("~/models/commonModels/commonModel");
const { userModel } = require("~/models/userModels/userModel");
const { userErrors } = require("~/variables/errors/userErrors");
const { chatErrors } = require("~/variables/errors/chatErrors");

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
  chatErrors,
  userErrors,
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
  participantIdValidationModel,
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
