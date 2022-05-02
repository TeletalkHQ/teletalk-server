const { request } = require("@/functions/utilities/testUtils");
const { randomString } = require("@/functions/utilities/utilsNoDeps");

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
      FIRST_NAME_REQUIRED: { properties: FIRST_NAME_REQUIRED },
      FIRST_NAME_MINLENGTH_REACH: { properties: FIRST_NAME_MINLENGTH_REACH },
      FIRST_NAME_MAXLENGTH_REACH: { properties: FIRST_NAME_MAXLENGTH_REACH },
      LAST_NAME_MAXLENGTH_REACH: { properties: LAST_NAME_MAXLENGTH_REACH },
    },
  },
} = require("@/variables/errors/userErrors");
const {
  userRoutes: {
    properties: {
      userRouteBaseUrl: { properties: userRouteBaseUrl },
      createNewUserRoute: { properties: createNewUserRoute },
    },
  },
} = require("@/variables/routes/userRoutes");

const userFullName = (firstName, lastName) => ({ firstName, lastName });

const myRequest = (data, errorObject) => {
  return request(userRouteBaseUrl, createNewUserRoute, data, errorObject);
};

const lastNameMaxLength = lastNameModel.maxlength.value;
const firstNameMaxLength = firstNameModel.maxlength.value;
const firstNameMinLength = firstNameModel.minlength.value;

describe("success create new normal user", () => {
  it("should create new user in db", async () => {
    await request(
      userRouteBaseUrl,
      createNewUserRoute,
      userFullName(
        randomString(firstNameMaxLength),
        randomString(lastNameMaxLength)
      )
    );
  });
});

describe("failure tests for create new normal user", () => {
  it("should get error, FIRST_NAME_REQUIRED", async () => {
    await myRequest(
      userFullName(null, randomString(randomString(lastNameMaxLength))),
      FIRST_NAME_REQUIRED
    );
  });
  it("should get error, FIRST_NAME_MINLENGTH_REACH", async () => {
    await myRequest(
      userFullName(randomString(+firstNameMinLength - 1)),
      FIRST_NAME_MINLENGTH_REACH
    );
  });

  it("should get error, FIRST_NAME_MAXLENGTH_REACH", async () => {
    await myRequest(
      userFullName(randomString(+firstNameMaxLength + 1)),
      FIRST_NAME_MAXLENGTH_REACH
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

  it("should get error, LAST_NAME_MAXLENGTH_REACH", async () => {
    await myRequest(
      userFullName(
        randomString(firstNameMaxLength),
        randomString(lastNameMaxLength + 1)
      ),
      LAST_NAME_MAXLENGTH_REACH
    );
  });
});
