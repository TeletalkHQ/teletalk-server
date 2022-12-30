const { expect } = require("chai");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { envManager } = require("@/classes/EnvironmentManager");

const { models } = require("@/models");

const { crashServer } = require("@/utilities/utilities");

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

const getApp = () => {
  const NODE_ENV = envManager.getNodeEnv();
  const {
    NODE_ENV: { test_development, test_production, test_production_local },
  } = envManager.ENVIRONMENT_VALUES;

  if (NODE_ENV === test_development) return require("@/app").app;

  if ([test_production, test_production_local].includes(NODE_ENV))
    return require("../../build").app;

  const message = "No server found! check your environments...";
  crashServer(message);
};

module.exports = {
  expect,
  getApp,
  getNonExistedCountryCode,
};
