const {
  validationErrorBuilder,
} = require("utility-store/src/classes/ValidationErrorBuilder");

const {
  userErrors: {
    COUNTRY_CODE_INVALID,
    COUNTRY_CODE_INVALID_TYPE,
    COUNTRY_CODE_MAXLENGTH_REACH,
    COUNTRY_CODE_MINLENGTH_REACH,
    COUNTRY_CODE_NOT_SUPPORTED,
    COUNTRY_CODE_NUMERIC,
    COUNTRY_CODE_REQUIRED,
    COUNTRY_NAME_INVALID,
    COUNTRY_NAME_INVALID_TYPE,
    COUNTRY_NAME_MAXLENGTH_REACH,
    COUNTRY_NAME_MINLENGTH_REACH,
    COUNTRY_NAME_NOT_SUPPORTED,
    COUNTRY_NAME_REQUIRED,
    FIRST_NAME_INVALID_TYPE,
    FIRST_NAME_MAXLENGTH_REACH,
    FIRST_NAME_MINLENGTH_REACH,
    FIRST_NAME_REQUIRED,
    LAST_NAME_INVALID,
    LAST_NAME_INVALID_TYPE,
    LAST_NAME_MAXLENGTH_REACH,
    LAST_NAME_REQUIRED,
    PHONE_NUMBER_INVALID,
    PHONE_NUMBER_INVALID_TYPE,
    PHONE_NUMBER_MAXLENGTH_REACH,
    PHONE_NUMBER_MINLENGTH_REACH,
    PHONE_NUMBER_NUMERIC,
    PHONE_NUMBER_REQUIRED,
    PRIVATE_ID_INVALID,
    PRIVATE_ID_INVALID_TYPE,
    PRIVATE_ID_MAX_LENGTH_REACH,
    PRIVATE_ID_MIN_LENGTH_REACH,
    PRIVATE_ID_REQUIRED,
    USERNAME_INVALID,
    USERNAME_INVALID_TYPE,
    USERNAME_MAXLENGTH_REACH,
    USERNAME_MINLENGTH_REACH,
    USERNAME_REQUIRED,
    VERIFICATION_CODE_INVALID,
    VERIFICATION_CODE_INVALID_LENGTH,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_NUMERIC,
    VERIFICATION_CODE_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const { countries } = require("@/variables/others/countries");

const countryCodeValidatorErrorBuilder = (validationResult, countryCode) => {
  const errorBuilder = validationErrorBuilder.create();

  errorBuilder
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedCountryCode: countryCode,
      },
    })
    .customCheck(validationResult === true, () => {
      const country = countries.find((c) => c.countryCode === countryCode);

      errorBuilder.addError(country === undefined, COUNTRY_CODE_NOT_SUPPORTED);
    })
    .stringEmpty(COUNTRY_CODE_REQUIRED)
    .required(COUNTRY_CODE_REQUIRED)
    .string(COUNTRY_CODE_INVALID_TYPE)
    .stringNumeric(COUNTRY_CODE_NUMERIC)
    .stringMin(COUNTRY_CODE_MINLENGTH_REACH)
    .stringMax(COUNTRY_CODE_MAXLENGTH_REACH)
    .throwAnyway(COUNTRY_CODE_INVALID)
    .execute();
};

const countryNameValidatorErrorBuilder = (validationResult, countryName) => {
  const errorBuilder = validationErrorBuilder.create();

  errorBuilder
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedCountryName: countryName,
      },
    })
    .customCheck(validationResult === true, () => {
      const country = countries.find((c) => c.countryName === countryName);

      errorBuilder.addError(country === undefined, COUNTRY_NAME_NOT_SUPPORTED);
    })
    .required(COUNTRY_NAME_REQUIRED)
    .stringEmpty(COUNTRY_NAME_REQUIRED)
    .string(COUNTRY_NAME_INVALID_TYPE)
    .stringMax(COUNTRY_NAME_MAXLENGTH_REACH)
    .stringMin(COUNTRY_NAME_MINLENGTH_REACH)
    .throwAnyway(COUNTRY_NAME_INVALID)
    .execute();
};

const firstNameValidatorErrorBuilder = (validationResult, firstName) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedFirstName: firstName,
      },
    })
    .required(FIRST_NAME_REQUIRED)
    .stringEmpty(FIRST_NAME_REQUIRED)
    .string(FIRST_NAME_INVALID_TYPE)
    .stringMin(FIRST_NAME_MINLENGTH_REACH)
    .stringMax(FIRST_NAME_MAXLENGTH_REACH)
    .execute();
};

const lastNameValidatorErrorBuilder = (validationResult, lastName) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: { validatedLastName: lastName },
    })
    .string(LAST_NAME_INVALID_TYPE)
    .stringMin(LAST_NAME_REQUIRED)
    .stringMax(LAST_NAME_MAXLENGTH_REACH)
    .throwAnyway(LAST_NAME_INVALID)
    .execute();
};

const phoneNumberValidatorErrorBuilder = (validationResult, phoneNumber) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedPhoneNumber: phoneNumber,
      },
    })
    .required(PHONE_NUMBER_REQUIRED)
    .stringEmpty(PHONE_NUMBER_REQUIRED)
    .string(PHONE_NUMBER_INVALID_TYPE)
    .stringMax(PHONE_NUMBER_MAXLENGTH_REACH)
    .stringMin(PHONE_NUMBER_MINLENGTH_REACH)
    .stringNumeric(PHONE_NUMBER_NUMERIC)
    .throwAnyway(PHONE_NUMBER_INVALID)
    .execute();
};

const privateIdValidatorErrorBuilder = (validationResult, privateId) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedPrivateId: privateId,
      },
    })
    .required(PRIVATE_ID_REQUIRED)
    .stringEmpty(PRIVATE_ID_REQUIRED)
    .string(PRIVATE_ID_INVALID_TYPE)
    .stringMin(PRIVATE_ID_MIN_LENGTH_REACH)
    .stringMax(PRIVATE_ID_MAX_LENGTH_REACH)
    .throwAnyway(PRIVATE_ID_INVALID)
    .execute();
};

const usernameValidatorErrorBuilder = (validationResult, username) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: { validatedUsername: username },
    })
    .required(USERNAME_REQUIRED)
    .stringEmpty(USERNAME_REQUIRED)
    .string(USERNAME_INVALID_TYPE)
    .stringMin(USERNAME_MINLENGTH_REACH)
    .stringMax(USERNAME_MAXLENGTH_REACH)
    .throwAnyway(USERNAME_INVALID)
    .execute();
};

const verificationCodeValidatorErrorBuilder = (
  validationResult,
  verificationCode
) => {
  validationErrorBuilder
    .create()
    .setRequirements(validationResult, {
      extraErrorFields: {
        validatedVerificationCode: verificationCode,
      },
    })
    .required(VERIFICATION_CODE_REQUIRED)
    .stringEmpty(VERIFICATION_CODE_REQUIRED)
    .string(VERIFICATION_CODE_INVALID_TYPE)
    .stringNumeric(VERIFICATION_CODE_NUMERIC)
    .stringLength(VERIFICATION_CODE_INVALID_LENGTH)
    .throwAnyway(VERIFICATION_CODE_INVALID)
    .execute();
};

//? ValidatorErrorBuilder

module.exports = {
  countryCodeValidatorErrorBuilder,
  countryNameValidatorErrorBuilder,
  firstNameValidatorErrorBuilder,
  lastNameValidatorErrorBuilder,
  phoneNumberValidatorErrorBuilder,
  privateIdValidatorErrorBuilder,
  usernameValidatorErrorBuilder,
  verificationCodeValidatorErrorBuilder,
};
