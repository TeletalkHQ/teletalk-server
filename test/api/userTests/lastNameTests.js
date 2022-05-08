const { CustomRequest } = require("@/functions/helpers/CustomRequest");
const {
  makeContact,
  randomString,
} = require("@/functions/utilities/utilsNoDeps");

const {
  userModels: { lastNameModel, firstNameModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: { LAST_NAME_INVALID_TYPE, LAST_NAME_MAXLENGTH_REACH },
} = require("@/variables/errors/userErrors");

const firstNameMaxLength = firstNameModel.maxlength.value;
const lastNameMaxLength = lastNameModel.maxlength.value;

//TODO Use makeFullName

const lastNameFailureTests = (cellphone) => {
  it("should get error, LAST_NAME_MAXLENGTH_REACH", async () => {
    await CustomRequest.sendRequest(
      makeContact(
        cellphone,
        randomString(firstNameMaxLength),
        randomString(lastNameMaxLength + 1)
      ),
      LAST_NAME_MAXLENGTH_REACH
    );
  });
  it("should get error, LAST_NAME_INVALID_TYPE", async () => {
    await CustomRequest.sendRequest(
      makeContact(
        cellphone,
        randomString(firstNameMaxLength),
        123456789 //* Invalid type!
      ),
      LAST_NAME_INVALID_TYPE
    );
  });

  // it("should get error, LAST_NAME_MINLENGTH_REACH", async () => {
  //   await myRequest(
  //     userFullName(
  //       randomString(firstNameMaxLength),
  //       randomString(lastNameMinLength - 1)
  //     ),
  //     LAST_NAME_MINLENGTH_REACH
  //   );
  // });
};

module.exports = { lastNameFailureTests };
