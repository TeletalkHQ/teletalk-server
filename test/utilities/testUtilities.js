const { expect } = require("chai");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

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

module.exports = {
  expect,
  getNonExistedCountryCode,
};
