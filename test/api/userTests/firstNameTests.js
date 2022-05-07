const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  randomString,
  makeContact,
} = require("@/functions/utilities/utilsNoDeps");
const {
  userModels: {
    properties: {
      firstNameModel: { properties: firstNameModel },
      lastNameModel: { properties: lastNameModel },
    },
  },
} = require("@/models/userModels/userModels");
const {
  userErrors: {
    properties: {
      FIRST_NAME_INVALID_TYPE: { properties: FIRST_NAME_INVALID_TYPE },
      FIRST_NAME_MAXLENGTH_REACH: { properties: FIRST_NAME_MAXLENGTH_REACH },
      FIRST_NAME_MINLENGTH_REACH: { properties: FIRST_NAME_MINLENGTH_REACH },
      FIRST_NAME_REQUIRED: { properties: FIRST_NAME_REQUIRED },
    },
  },
} = require("@/variables/errors/userErrors");

const firstNameMaxLength = firstNameModel.maxlength.value;
const firstNameMinLength = firstNameModel.minlength.value;
const lastNameMaxLength = lastNameModel.maxlength.value;

const firstNameFailureTests = (cellphone) => {
  it("should get error, FIRST_NAME_REQUIRED", async () => {
    await customRequest.sendRequest(
      makeContact(cellphone, undefined, randomString(lastNameMaxLength)),
      FIRST_NAME_REQUIRED
    );
  });
  it("should get error, FIRST_NAME_MINLENGTH_REACH", async () => {
    await customRequest.sendRequest(
      makeContact(cellphone, randomString(+firstNameMinLength - 1), undefined),
      FIRST_NAME_MINLENGTH_REACH
    );
  });
  it("should get error, FIRST_NAME_MAXLENGTH_REACH", async () => {
    await customRequest.sendRequest(
      makeContact(cellphone, randomString(+firstNameMaxLength + 1), undefined),
      FIRST_NAME_MAXLENGTH_REACH
    );
  });
  it("should get error, FIRST_NAME_INVALID_TYPE", async () => {
    await customRequest.sendRequest(
      makeContact(
        cellphone,
        123456789, //* Invalid type!
        undefined
      ),
      FIRST_NAME_INVALID_TYPE
    );
  });
};

module.exports = { firstNameFailureTests };
