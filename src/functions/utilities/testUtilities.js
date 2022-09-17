const { expect } = require("chai");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");
const { countries } = require("utility-store/src/variables/countries");

const { stateManager } = require("@/classes/StateManager");

const { userModels } = require("@/models/dataModels/userModels");

const getNonExistedCountryCode = () => {
  const {
    countryCodeModel: {
      maxlength: { value: countryCodeMaxlength },
    },
  } = userModels;
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
