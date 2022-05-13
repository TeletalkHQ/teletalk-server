const { customRequest } = require("@/functions/helpers/CustomRequest");
const { randomString } = require("@/functions/utilities/utils");

const {
  userModels: { lastNameModel },
} = require("@/models/userModels/userModels");

const {
  userErrors: { LAST_NAME_INVALID_TYPE, LAST_NAME_MAXLENGTH_REACH },
} = require("@/variables/errors/userErrors");

const lastNameMaxLength = lastNameModel.maxlength.value;

const lastNameFailureTests = (data) => {
  const fn = (lastName) => ({ ...data, lastName });
  it("should get error, LAST_NAME_MAXLENGTH_REACH", async () => {
    await customRequest.sendRequest(
      fn(randomString(lastNameMaxLength + 1)),
      LAST_NAME_MAXLENGTH_REACH
    );
  });
  it("should get error, LAST_NAME_INVALID_TYPE", async () => {
    await customRequest.sendRequest(fn(123456789), LAST_NAME_INVALID_TYPE);
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
