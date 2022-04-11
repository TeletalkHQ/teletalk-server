const { userModel } = require("~/models/userModels/user.model");

const {
  bio: {
    properties: {
      type: { value: bio },
    },
  },
  blacklist: {
    properties: {
      type: { value: blacklist },
    },
  },
  contacts: {
    properties: {
      type: { value: contacts },
    },
  },
  countryCode: {
    properties: {
      type: { value: countryCode },
    },
  },
  countryName: {
    properties: {
      type: { value: countryName },
    },
  },
  createdAt: {
    properties: {
      type: { value: createdAt },
    },
  },
  firstName: {
    properties: {
      type: { value: firstName },
    },
  },
  lastName: {
    properties: {
      type: { value: lastName },
    },
  },
  macAddress: {
    properties: {
      type: { value: macAddress },
    },
  },
  phoneNumber: {
    properties: {
      type: { value: phoneNumber },
    },
  },
  privateID: {
    properties: {
      type: { value: privateID },
    },
  },
  token: {
    properties: {
      type: { value: token },
    },
  },
  username: {
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
