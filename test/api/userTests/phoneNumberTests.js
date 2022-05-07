const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  makeCellphone,
  randomStringNumber,
} = require("@/functions/utilities/utilsNoDeps");
const {
  userModels: {
    properties: {
      phoneNumberModel: { properties: phoneNumberModel },
    },
  },
} = require("@/models/userModels/userModels");
const {
  userErrors: {
    properties: {
      PHONE_NUMBER_INVALID_TYPE: { properties: PHONE_NUMBER_INVALID_TYPE },
      PHONE_NUMBER_MAXLENGTH_REACH: {
        properties: PHONE_NUMBER_MAXLENGTH_REACH,
      },
      PHONE_NUMBER_MINLENGTH_REACH: {
        properties: PHONE_NUMBER_MINLENGTH_REACH,
      },
      PHONE_NUMBER_NUMERIC: { properties: PHONE_NUMBER_NUMERIC },
      PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
    },
  },
} = require("@/variables/errors/userErrors");

const phoneNumberMaxlength = phoneNumberModel.maxlength.value;
const phoneNumberMinlength = phoneNumberModel.minlength.value;

const phoneNumberFailureTests = (cellphone) => {
  it(`It should get error, PHONE_NUMBER_REQUIRED`, async () => {
    await customRequest.sendRequest(
      makeCellphone(cellphone.countryCode, cellphone.countryName),
      PHONE_NUMBER_REQUIRED
    );
  });
  it(`It should get error, PHONE_NUMBER_INVALID_TYPE`, async () => {
    await customRequest.sendRequest(
      makeCellphone(cellphone.countryCode, cellphone.countryName, 9119119191),
      PHONE_NUMBER_INVALID_TYPE
    );
  });
  it(`It should get error, PHONE_NUMBER_NUMERIC`, async () => {
    await customRequest.sendRequest(
      makeCellphone(
        cellphone.countryCode,
        cellphone.countryName,
        "9119119191!"
      ),
      PHONE_NUMBER_NUMERIC
    );
  });
  it(`It should get error, PHONE_NUMBER_MINLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      makeCellphone(
        cellphone.countryCode,
        cellphone.countryName,
        randomStringNumber(phoneNumberMinlength - 1)
      ),
      PHONE_NUMBER_MINLENGTH_REACH
    );
  });
  it(`It should get error, PHONE_NUMBER_MAXLENGTH_REACH`, async () => {
    await customRequest.sendRequest(
      makeCellphone(
        cellphone.countryCode,
        cellphone.countryName,
        randomStringNumber(phoneNumberMaxlength + 1)
      ),
      PHONE_NUMBER_MAXLENGTH_REACH
    );
  });
};

module.exports = { phoneNumberFailureTests };
