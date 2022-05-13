const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");
const {
  userModels: {
    bioModel,
    countryCodeModel,
    countryNameModel,
    firstNameModel,
    lastNameModel,
    macAddressModel,
    phoneNumberModel,
    privateIdModel,
    tokenModel,
    usernameModel,
    verificationCodeModel,
  },
} = require("@/models/userModels/userModels");

const bioValidationModel = {
  bio: {
    empty: bioModel.empty.value,
    max: bioModel.maxlength.value,
    optional: !bioModel.required.value,
    type: bioModel.type.value,
    messages: {
      string: bioModel.type.error.message,
      stringEmpty: bioModel.empty.error.message,
      stringMax: bioModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const countryCodeValidationModel = {
  countryCode: {
    empty: countryCodeModel.empty.value,
    max: countryCodeModel.maxlength.value,
    min: countryCodeModel.minlength.value,
    numeric: countryCodeModel.numeric.value,
    trim: countryCodeModel.trim.value,
    type: countryCodeModel.type.value,
    messages: {
      required: countryCodeModel.required.error.message,
      string: countryCodeModel.type.error.message,
      stringEmpty: countryCodeModel.empty.error.message,
      stringMax: countryCodeModel.maxlength.error.message,
      stringMin: countryCodeModel.minlength.error.message,
      stringNumeric: countryCodeModel.numeric.error.message,
    },
  },
  version: "1.0.0",
};

const countryNameValidationModel = {
  countryName: {
    empty: countryNameModel.empty.value,
    max: countryNameModel.maxlength.value,
    min: countryNameModel.minlength.value,
    type: countryNameModel.type.value,
    messages: {
      required: countryNameModel.required.error.message,
      string: countryNameModel.type.error.message,
      stringEmpty: countryNameModel.empty.error.message,
      stringMax: countryNameModel.maxlength.error.message,
      stringMin: countryNameModel.minlength.error.message,
    },
  },
  version: "1.0.0",
};

const firstNameValidationModel = {
  firstName: {
    empty: firstNameModel.empty.value,
    max: firstNameModel.maxlength.value,
    min: firstNameModel.minlength.value,
    trim: firstNameModel.trim.value,
    type: firstNameModel.type.value,
    messages: {
      required: firstNameModel.required.error.message,
      string: firstNameModel.type.error.message,
      stringEmpty: firstNameModel.empty.error.message,
      stringMax: firstNameModel.maxlength.error.message,
      stringMin: firstNameModel.minlength.error.message,
    },
  },
  version: "1.0.0",
};

const lastNameValidationModel = {
  lastName: {
    empty: lastNameModel.empty.value,
    max: lastNameModel.maxlength.value,
    optional: !lastNameModel.required.value,
    trim: lastNameModel.trim.value,
    type: lastNameModel.type.value,
    messages: {
      string: lastNameModel.type.error.message,
      stringEmpty: lastNameModel.empty.error.message,
      stringMax: lastNameModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const macAddressValidationModel = {
  macAddress: {
    empty: macAddressModel.empty.value,
    max: macAddressModel.maxlength.value,
    min: macAddressModel.minlength.value,
    trim: macAddressModel.trim.value,
    type: macAddressModel.type.value,
    unique: macAddressModel.unique.value,
    messages: {
      required: macAddressModel.required.error.message,
      string: macAddressModel.type.error.message,
      stringEmpty: macAddressModel.empty.error.message,
      stringMax: macAddressModel.maxlength.error.message,
      stringMin: macAddressModel.minlength.error.message,
      unique: macAddressModel.unique.error.message,
    },
  },
  version: "1.0.0",
};

const phoneNumberValidationModel = {
  phoneNumber: {
    empty: phoneNumberModel.empty.value,
    max: phoneNumberModel.maxlength.value,
    min: phoneNumberModel.minlength.value,
    numeric: phoneNumberModel.numeric.value,
    type: phoneNumberModel.type.value,
    messages: {
      required: phoneNumberModel.required.error.message,
      string: phoneNumberModel.type.error.message,
      stringEmpty: phoneNumberModel.empty.error.message,
      stringMax: phoneNumberModel.maxlength.error.message,
      stringMin: phoneNumberModel.minlength.error.message,
      stringNumeric: phoneNumberModel.numeric.error.message,
    },
  },
  version: "1.0.0",
};

const privateIdValidationModel = {
  privateId: {
    max: privateIdModel.maxlength.value,
    min: privateIdModel.minlength.value,
    trim: privateIdModel.trim.value,
    type: privateIdModel.type.value,
    unique: privateIdModel.unique.value,
    messages: {
      required: privateIdModel.required.error.message,
      string: privateIdModel.type.error.message,
      stringMax: privateIdModel.maxlength.error.message,
      stringMin: privateIdModel.minlength.error.message,
      unique: privateIdModel.unique.error.message,
    },
  },
  version: "1.0.0",
};

const tokenValidationModel = {
  token: {
    type: tokenModel.type.value,
    messages: {
      required: tokenModel.required.error.message,
      string: tokenModel.type.error.message,
    },
  },
  version: "1.0.0",
};

const verificationCodeValidationModel = {
  verificationCode: {
    empty: verificationCodeModel.empty.value,
    length: verificationCodeModel.length.value,
    numeric: verificationCodeModel.numeric.value,
    trim: verificationCodeModel.trim.value,
    type: verificationCodeModel.type.value,
    messages: {
      length: verificationCodeModel.length.error.message,
      string: verificationCodeModel.type.error.message,
      stringEmpty: verificationCodeModel.empty.error.message,
      stringNumeric: verificationCodeModel.numeric.error.message,
    },
  },
  version: "1.0.0",
};

const cellphoneValidationModel = {
  ...countryCodeValidationModel,
  ...countryNameValidationModel,
  ...phoneNumberValidationModel,

  version: "1.0.0",
};

const usernameValidationModel = {
  username: {
    empty: usernameModel.empty.value,
    lowercase: usernameModel.lowercase.value,
    max: usernameModel.maxlength.value,
    optional: !usernameModel.required.value,
    trim: usernameModel.trim.value,
    type: usernameModel.type.value,
    unique: usernameModel.unique.value,
    messages: {
      string: usernameModel.type.error.message,
      stringEmpty: usernameModel.empty.error.message,
      stringMax: usernameModel.maxlength.error.message,
      unique: usernameModel.unique.error.message,
    },
  },

  version: "1.0.0",
};

const models = {
  bioValidationModel,
  cellphoneValidationModel,
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
};

const userValidationModels = {
  ...models,
  version: versionCalculator(extractVersions(models)),
};

module.exports = {
  userValidationModels,
};
