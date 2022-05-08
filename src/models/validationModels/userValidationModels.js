const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utilsNoDeps");
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

const bioValidationsModel = {
  bio: {
    type: bioModel.type.value,
    optional: !bioModel.required.value,
    max: bioModel.maxlength.value,
    messages: {
      string: bioModel.type.error.message,
      stringMax: bioModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const countryCodeValidationModel = {
  countryCode: {
    type: countryCodeModel.type.value,
    min: countryCodeModel.minlength.value,
    max: countryCodeModel.maxlength.value,
    trim: countryCodeModel.trim.value,
    numeric: countryCodeModel.numeric.value,
    messages: {
      string: countryCodeModel.type.error.message,
      required: countryCodeModel.required.error.message,
      stringMin: countryCodeModel.minlength.error.message,
      stringMax: countryCodeModel.maxlength.error.message,
      stringNumeric: countryCodeModel.numeric.error.message,
    },
  },
  version: "1.0.0",
};

const countryNameValidationModel = {
  countryName: {
    type: countryNameModel.type.value,
    min: countryNameModel.minlength.value,
    max: countryNameModel.maxlength.value,
    messages: {
      string: countryNameModel.type.error.message,
      required: countryNameModel.required.error.message,
      stringMin: countryNameModel.minlength.error.message,
      stringMax: countryNameModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const firstNameValidationModel = {
  firstName: {
    type: firstNameModel.type.value,
    min: firstNameModel.minlength.value,
    max: firstNameModel.maxlength.value,
    trim: firstNameModel.trim.value,
    messages: {
      string: firstNameModel.type.error.message,
      required: firstNameModel.required.error.message,
      stringMin: firstNameModel.minlength.error.message,
      stringMax: firstNameModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const lastNameValidationModel = {
  lastName: {
    type: lastNameModel.type.value,
    optional: !lastNameModel.required.value,
    max: lastNameModel.maxlength.value,
    trim: lastNameModel.trim.value,
    messages: {
      string: lastNameModel.type.error.message,
      stringMax: lastNameModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const macAddressValidationModel = {
  macAddress: {
    type: macAddressModel.type.value,
    unique: macAddressModel.unique.value,
    min: macAddressModel.minlength.value,
    max: macAddressModel.maxlength.value,
    trim: macAddressModel.trim.value,
    messages: {
      string: macAddressModel.type.error.message,
      unique: macAddressModel.unique.error.message,
      required: macAddressModel.required.error.message,
      stringMin: macAddressModel.minlength.error.message,
      stringMax: macAddressModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const phoneNumberValidationModel = {
  phoneNumber: {
    type: phoneNumberModel.type.value,
    min: phoneNumberModel.minlength.value,
    max: phoneNumberModel.maxlength.value,
    numeric: phoneNumberModel.numeric.value,
    messages: {
      string: phoneNumberModel.type.error.message,
      required: phoneNumberModel.required.error.message,
      stringMin: phoneNumberModel.minlength.error.message,
      stringMax: phoneNumberModel.maxlength.error.message,
      stringNumeric: phoneNumberModel.numeric.error.message,
    },
  },
  version: "1.0.0",
};

const privateIdValidationModel = {
  privateId: {
    type: privateIdModel.type.value,
    unique: privateIdModel.unique.value,
    min: privateIdModel.minlength.value,
    max: privateIdModel.maxlength.value,
    trim: privateIdModel.trim.value,
    messages: {
      string: privateIdModel.type.error.message,
      required: privateIdModel.required.error.message,
      unique: privateIdModel.unique.error.message,
      stringMin: privateIdModel.minlength.error.message,
      stringMax: privateIdModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const tokenValidationModel = {
  token: {
    type: tokenModel.type.value,
    messages: {
      string: tokenModel.type.error.message,
      required: tokenModel.required.error.message,
    },
  },
  version: "1.0.0",
};

const verificationCodeValidationModel = {
  verificationCode: {
    type: verificationCodeModel.type.value,
    length: verificationCodeModel.length.value,
    trim: verificationCodeModel.trim.value,
    numeric: verificationCodeModel.numeric.value,
    empty: verificationCodeModel.empty.value,
    messages: {
      string: verificationCodeModel.type.error.message,
      length: verificationCodeModel.length.error.message,
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
    type: usernameModel.type.value,
    optional: !usernameModel.required.value,
    unique: usernameModel.unique.value,
    max: usernameModel.maxlength.value,
    trim: usernameModel.trim.value,
    lowercase: usernameModel.lowercase.value,
    messages: {
      string: usernameModel.type.error.message,
      unique: usernameModel.unique.error.message,
      stringMax: usernameModel.maxlength.error.message,
    },
  },

  version: "1.0.0",
};

const models = {
  bioValidationsModel,
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
