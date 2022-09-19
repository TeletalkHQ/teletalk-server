const { ValidationModelBuilder } = require("@/classes/ValidationModelBuilder");

const {
  chatValidationModels: {
    chatIdValidationModel,
    messageIdValidationModel,
    messageTextValidationModel,
    participantIdValidationModel,
  },
} = require("@/models/validationModels/chatValidationModels");

const {
  commonValidationModels: { createdAtValidationModel },
} = require("@/models/validationModels/commonValidationModels");

const {
  userValidationModels: {
    bioValidationModel,
    countryCodeValidationModel,
    countryNameValidationModel,
    firstNameValidationModel,
    lastNameValidationModel,
    macAddressValidationModel,
    phoneNumberValidationModel,
    privateIdValidationModel,
    tokenValidationModel,
    usernameValidationModel,
    verificationCodeValidationModel,
  },
} = require("@/models/validationModels/userValidationModels");

const compiledBioValidator =
  ValidationModelBuilder.validatorCompiler(bioValidationModel);

const compiledChatIdValidator = ValidationModelBuilder.validatorCompiler(
  chatIdValidationModel
);

const compiledMessageIdValidator = ValidationModelBuilder.validatorCompiler(
  messageIdValidationModel
);

const compiledMessageTextValidator = ValidationModelBuilder.validatorCompiler(
  messageTextValidationModel
);

const compiledParticipantIdValidator = ValidationModelBuilder.validatorCompiler(
  participantIdValidationModel
);

const compiledCountryCodeValidator = ValidationModelBuilder.validatorCompiler(
  countryCodeValidationModel
);

const compiledCountryNameValidator = ValidationModelBuilder.validatorCompiler(
  countryNameValidationModel
);

const compiledCreatedAtValidator = ValidationModelBuilder.validatorCompiler(
  createdAtValidationModel
);

const compiledFirstNameValidator = ValidationModelBuilder.validatorCompiler(
  firstNameValidationModel
);

const compiledLastNameValidator = ValidationModelBuilder.validatorCompiler(
  lastNameValidationModel
);

const compiledMacAddressValidator = ValidationModelBuilder.validatorCompiler(
  macAddressValidationModel
);

const compiledPhoneNumberValidator = ValidationModelBuilder.validatorCompiler(
  phoneNumberValidationModel
);

const compiledPrivateIdValidator = ValidationModelBuilder.validatorCompiler(
  privateIdValidationModel
);

const compiledTokenValidator =
  ValidationModelBuilder.validatorCompiler(tokenValidationModel);

const compiledUsernameValidator = ValidationModelBuilder.validatorCompiler(
  usernameValidationModel
);

const compiledVerificationCodeValidator =
  ValidationModelBuilder.validatorCompiler(verificationCodeValidationModel);

const compiledValidators = {
  compiledBioValidator,
  compiledChatIdValidator,
  compiledCountryCodeValidator,
  compiledCountryNameValidator,
  compiledCreatedAtValidator,
  compiledFirstNameValidator,
  compiledLastNameValidator,
  compiledMacAddressValidator,
  compiledMessageIdValidator,
  compiledMessageTextValidator,
  compiledParticipantIdValidator,
  compiledPhoneNumberValidator,
  compiledPrivateIdValidator,
  compiledTokenValidator,
  compiledUsernameValidator,
  compiledVerificationCodeValidator,
};

module.exports = { compiledValidators };
