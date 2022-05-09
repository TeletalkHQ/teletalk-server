const { CustomRequest } = require("@/functions/helpers/CustomRequest");
const { randomStringNumber } = require("@/functions/utilities/utils");
const { userProps } = require("@/functions/helpers/UserProps");
const {
  userModels: { phoneNumberModel },
} = require("@/models/userModels/userModels");
const {
  userErrors: {
    PHONE_NUMBER_INVALID_TYPE,
    PHONE_NUMBER_MAXLENGTH_REACH,
    PHONE_NUMBER_MINLENGTH_REACH,
    PHONE_NUMBER_NUMERIC,
    PHONE_NUMBER_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const phoneNumberMaxlength = phoneNumberModel.maxlength.value;
const phoneNumberMinlength = phoneNumberModel.minlength.value;

const phoneNumberFailureTests = (cellphone) => {
  it(`It should get error, PHONE_NUMBER_REQUIRED`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(cellphone.countryCode, cellphone.countryName),
      PHONE_NUMBER_REQUIRED
    );
  });
  it(`It should get error, PHONE_NUMBER_INVALID_TYPE`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        cellphone.countryCode,
        cellphone.countryName,
        9119119191
      ),
      PHONE_NUMBER_INVALID_TYPE
    );
  });
  it(`It should get error, PHONE_NUMBER_NUMERIC`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        cellphone.countryCode,
        cellphone.countryName,
        "9119119191!"
      ),
      PHONE_NUMBER_NUMERIC
    );
  });
  it(`It should get error, PHONE_NUMBER_MINLENGTH_REACH`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        cellphone.countryCode,
        cellphone.countryName,
        randomStringNumber(phoneNumberMinlength - 1)
      ),
      PHONE_NUMBER_MINLENGTH_REACH
    );
  });
  it(`It should get error, PHONE_NUMBER_MAXLENGTH_REACH`, async () => {
    await CustomRequest.sendRequest(
      userProps.makeCellphone(
        cellphone.countryCode,
        cellphone.countryName,
        randomStringNumber(phoneNumberMaxlength + 1)
      ),
      PHONE_NUMBER_MAXLENGTH_REACH
    );
  });
};

module.exports = { phoneNumberFailureTests };
