const { CustomRequest } = require("@/functions/helpers/CustomRequest");
const { userProps } = require("@/functions/helpers/UserProps");
const { randomString } = require("@/functions/utilities/utils");

const {
  userModels: { firstNameModel, lastNameModel },
} = require("@/models/userModels/userModels");
const {
  userErrors: {
    FIRST_NAME_INVALID_TYPE,
    FIRST_NAME_MAXLENGTH_REACH,
    FIRST_NAME_MINLENGTH_REACH,
    FIRST_NAME_REQUIRED,
  },
} = require("@/variables/errors/userErrors");

const firstNameMaxLength = firstNameModel.maxlength.value;
const firstNameMinLength = firstNameModel.minlength.value;
const lastNameMaxLength = lastNameModel.maxlength.value;

const firstNameFailureTests = (cellphone) => {
  it("should get error, FIRST_NAME_REQUIRED", async () => {
    await CustomRequest.sendRequest(
      userProps.makeContact(
        cellphone,
        undefined,
        randomString(lastNameMaxLength)
      ),
      FIRST_NAME_REQUIRED
    );
  });
  it("should get error, FIRST_NAME_MINLENGTH_REACH", async () => {
    await CustomRequest.sendRequest(
      userProps.makeContact(
        cellphone,
        randomString(+firstNameMinLength - 1),
        undefined
      ),
      FIRST_NAME_MINLENGTH_REACH
    );
  });
  it("should get error, FIRST_NAME_MAXLENGTH_REACH", async () => {
    await CustomRequest.sendRequest(
      userProps.makeContact(
        cellphone,
        randomString(+firstNameMaxLength + 1),
        undefined
      ),
      FIRST_NAME_MAXLENGTH_REACH
    );
  });
  it("should get error, FIRST_NAME_INVALID_TYPE", async () => {
    await CustomRequest.sendRequest(
      userProps.makeContact(
        cellphone,
        123456789, //* Invalid type!
        undefined
      ),
      FIRST_NAME_INVALID_TYPE
    );
  });
};

module.exports = { firstNameFailureTests };
