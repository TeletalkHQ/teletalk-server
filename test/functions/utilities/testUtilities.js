const { expect } = require("chai");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { stateManager } = require("@/classes/StateManager");

const { models } = require("@/models");

const { countries } = require("@/variables/others/countries");

const getNonExistedCountryCode = () => {
  const {
    countryCode: {
      maxlength: { value: countryCodeMaxlength },
    },
  } = models.native.user;
  const randomCountryCode =
    randomMaker.randomStringNumber(countryCodeMaxlength);

  const country = countries.find((c) => c.countryCode === randomCountryCode);

  if (country) return getNonExistedCountryCode();

  return randomCountryCode;
};

const setTestUsers = async (testUsers) => {
  const { testUsers: stateKey } = stateManager.stateKeys;
  return await stateManager.setState(stateKey, testUsers);
};

module.exports = {
  expect,
  getNonExistedCountryCode,
  setTestUsers,
};
