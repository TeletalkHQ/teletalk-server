const {
  chatIDValidationSchema,
} = require("~/schemas/validationSchemas/chatValidationSchemas/chatIDValidationSchema");
const {
  messageIDValidationSchema,
} = require("~/schemas/validationSchemas/chatValidationSchemas/messageIDValidationSchema");
const {
  messageTextValidationSchema,
} = require("~/schemas/validationSchemas/chatValidationSchemas/messageTextValidationSchema");
const {
  participantIDValidationSchema,
} = require("~/schemas/validationSchemas/chatValidationSchemas/participantIDValidationSchema");
const {
  createdAtValidationSchema,
} = require("~/schemas/validationSchemas/commonValidationSchemas/createdAtValidationSchema");
const {
  bioValidationsSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/bioValidationsSchema");
const {
  countryCodeValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/countryCodeValidationSchema");
const {
  countryNameValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/countryNameValidationSchema");
const {
  firstNameValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/firstNameValidationSchema");
const {
  lastNameValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/lastNameValidationSchema");
const {
  macAddressValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/macAddressValidationSchema");
const {
  phoneNumberValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/phoneNumberValidationSchema");
const {
  privateIDValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/privateIDValidationSchema");
const {
  usernameValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/usernameValidationSchema");
const {
  verificationCodeValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/verificationCodeValidationSchema");

const {
  cellphoneRouterTemplate,
} = require("~/templates/routerTemplates/cellphoneRouterTemplate");
const {
  otherRouterTemplate,
} = require("~/templates/routerTemplates/otherRouterTemplate");
const {
  privateChatRouterTemplate,
} = require("~/templates/routerTemplates/privateChatRouterTemplate");
const {
  userRouterTemplate,
} = require("~/templates/routerTemplates/userRouterTemplate");
const {
  versionControlRouterTemplate,
} = require("~/templates/routerTemplates/versionControlRouterTemplate");

const {
  chatSchemaTemplate,
} = require("~/templates/schemaTemplates/chatSchemaTemplate");
const {
  commonSchemaTemplate,
} = require("~/templates/schemaTemplates/commonSchemaTemplate");
const {
  userSchemaTemplate,
} = require("~/templates/schemaTemplates/userSchemaTemplate");
const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");
const {
  chatErrorTemplate,
} = require("~/templates/errorTemplates/chatErrorTemplate");

const routerTemplates = {
  cellphoneRouterTemplate,
  otherRouterTemplate,
  privateChatRouterTemplate,
  userRouterTemplate,
  versionControlRouterTemplate,
};

const schemaTemplates = {
  chatSchemaTemplate,
  commonSchemaTemplate,
  userSchemaTemplate,
};

const errorTemplates = {
  chatErrorTemplate,
  userErrorTemplate,
};

const validationSchemas = {
  bioValidationsSchema,
  chatIDValidationSchema,
  countryCodeValidationSchema,
  countryNameValidationSchema,
  createdAtValidationSchema,
  firstNameValidationSchema,
  lastNameValidationSchema,
  macAddressValidationSchema,
  messageIDValidationSchema,
  messageTextValidationSchema,
  participantIDValidationSchema,
  phoneNumberValidationSchema,
  privateIDValidationSchema,
  usernameValidationSchema,
  verificationCodeValidationSchema,
};

const allStuff = {
  templates: { schemaTemplates, routerTemplates, errorTemplates },
  schemas: {
    validationSchemas,
  },
};

module.exports = {
  allStuff,
  schemaTemplates,
  routerTemplates,
  validationSchemas,
};
