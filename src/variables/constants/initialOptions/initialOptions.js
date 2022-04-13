const { userModel } = require("~/models/userModels/user.model");

const {
  bioModel: {
    properties: {
      type: { value: bio },
    },
  },
  blacklistModel: {
    properties: {
      type: { value: blacklist },
    },
  },
  contactsModel: {
    properties: {
      type: { value: contacts },
    },
  },
  countryCodeModel: {
    properties: {
      type: { value: countryCode },
    },
  },
  countryNameModel: {
    properties: {
      type: { value: countryName },
    },
  },
  createdAtModel: {
    properties: {
      type: { value: createdAt },
    },
  },
  firstNameModel: {
    properties: {
      type: { value: firstName },
    },
  },
  lastNameModel: {
    properties: {
      type: { value: lastName },
    },
  },
  macAddressModel: {
    properties: {
      type: { value: macAddress },
    },
  },
  phoneNumberModel: {
    properties: {
      type: { value: phoneNumber },
    },
  },
  privateIDModel: {
    properties: {
      type: { value: privateID },
    },
  },
  tokenModel: {
    properties: {
      type: { value: token },
    },
  },
  usernameModel: {
    properties: {
      type: { value: username },
    },
  },
} = userModel;

const userInitialOptions = {
  bio,
  blacklist,
  contacts,
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  macAddress,
  phoneNumber,
  privateID,
  token,
  username,
};

const initialOptions = { userInitialOptions };

module.exports = { initialOptions };
