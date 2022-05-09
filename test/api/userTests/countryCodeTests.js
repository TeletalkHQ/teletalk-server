const { CustomRequest } = require("@/functions/helpers/CustomRequest");
const { randomStringNumber } = require("@/functions/utilities/utils");
const { userProps } = require("@/functions/helpers/UserProps");

const {
  userModels: { countryCodeModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: {
    COUNTRY_CODE_INVALID_TYPE,
    COUNTRY_CODE_MAXLENGTH_REACH,
    COUNTRY_CODE_MINLENGTH_REACH,
    COUNTRY_CODE_NOT_SUPPORTED,
    COUNTRY_CODE_NUMERIC,
    COUNTRY_CODE_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const countryCodeMaxlength = countryCodeModel.maxlength.value;
const countryCodeMinlength = countryCodeModel.minlength.value;

const countryCodeFailureTests = (cellphone) => {
  it(`It should get error, COUNTRY_CODE_REQUIRED`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        undefined,
        cellphone.countryName,
        cellphone.phoneNumber
      ),
      COUNTRY_CODE_REQUIRED
    );
  });
  it(`It should get error, COUNTRY_CODE_NUMERIC`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        "98!",
        cellphone.countryName,
        cellphone.phoneNumber
      ),
      COUNTRY_CODE_NUMERIC
    );
  });
  it(`It should get error, COUNTRY_CODE_INVALID_TYPE`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(98, cellphone.countryName, cellphone.phoneNumber),
      COUNTRY_CODE_INVALID_TYPE
    );
  });
  it(`It should get error, COUNTRY_CODE_NOT_SUPPORTED`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        "010101",
        cellphone.countryName,
        cellphone.phoneNumber
      ),
      COUNTRY_CODE_NOT_SUPPORTED
    );
  });
  it(`It should get error, COUNTRY_CODE_MINLENGTH_REACH`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        randomStringNumber(countryCodeMinlength - 1),
        cellphone.countryName,
        cellphone.phoneNumber
      ),
      COUNTRY_CODE_MINLENGTH_REACH
    );
  });
  it(`It should get error, COUNTRY_CODE_MAXLENGTH_REACH`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        randomStringNumber(countryCodeMaxlength + 1),
        cellphone.countryName,
        cellphone.phoneNumber
      ),
      COUNTRY_CODE_MAXLENGTH_REACH
    );
  });
};

module.exports = { countryCodeFailureTests };
