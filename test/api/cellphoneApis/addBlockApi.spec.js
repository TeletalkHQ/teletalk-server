// const { setTestUserAndTestToken } = require("@/functions/utilities/testUtils");
// const { getTestUsers } = require("@/functions/utilities/utils");
// const { request, expect } = require("@/functions/utilities/testUtils");
// const {
//   randomNumber,
//   randomCountryCode,
// } = require("@/functions/utilities/utilsNoDeps");

// const {
//   cellphoneRoutes: {
//     properties: {
//       addBlockRoute: { properties: addBlockRoute },
//       cellphoneRouteBaseUrl: { properties: cellphoneRouteBaseUrl },
//     },
//   },
// } = require("@/variables/routes/cellphoneRoutes");
// const {
//   userErrors: {
//     properties: {
//       SELF_STUFF: { properties: SELF_STUFF },
//       CONTACT_ITEM_EXIST: { properties: CONTACT_ITEM_EXIST },
//       CELLPHONE_REQUIRED: { properties: CELLPHONE_REQUIRED },
//       COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
//       COUNTRY_CODE_NOT_SUPPORTED: { properties: COUNTRY_CODE_NOT_SUPPORTED },
//       COUNTRY_CODE_REQUIRED: { properties: COUNTRY_CODE_REQUIRED },
//       COUNTRY_CODE_NUMERIC: { properties: COUNTRY_CODE_NUMERIC },
//       COUNTRY_NAME_NOT_SUPPORTED: { properties: COUNTRY_NAME_NOT_SUPPORTED },
//       COUNTRY_NAME_REQUIRED: { properties: COUNTRY_NAME_REQUIRED },
//       PHONE_NUMBER_INVALID_TYPE: { properties: PHONE_NUMBER_INVALID_TYPE },
//       PHONE_NUMBER_NUMERIC: { properties: PHONE_NUMBER_NUMERIC },
//       PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
//     },
//   },
// } = require("@/variables/errors/userErrors");
// const { countries } = require("@/variables/constants/countries");

// const {
//   userModels: {
//     properties: {
//       privateIdModel: { properties: privateIdModel },
//       firstNameModel: { properties: firstNameModel },
//       lastNameModel: { properties: lastNameModel },
//     },
//   },
// } = require("@/models/userModels/userModels");

// let testUsers = {};

// const cellphone = {
//   ...countries[randomCountryCode()],
//   phoneNumber: randomNumber(10),
// };

// const myRequest = (data, errorObject) => {
//   return request(cellphoneRouteBaseUrl, addBlockRoute, data, errorObject);
// };

// describe("", () => {
//   it("should fill testUsers object", async () => {
//     testUsers = await getTestUsers();

//     setTestUserAndTestToken(testUsers.testUser_0);
//   });
// });

// describe("add contact successfully", () => {
//   it(`should add testUser_1 to testUser_0 contact list`, async () => {
//     const { testUser_1 } = testUsers;

//     const {
//       body: {
//         contact: { firstName, lastName, privateId },
//       },
//     } = await myRequest(testUser_1);

//     expect(firstName).equal(testUser_1.firstName);
//     expect(firstName.length)
//       .greaterThanOrEqual(firstNameModel.minlength.value)
//       .lessThanOrEqual(firstNameModel.maxlength.value);

//     expect(lastName).equal(testUser_1.lastName);
//     expect(lastName.length)
//       .greaterThanOrEqual(lastNameModel.minlength.value)
//       .lessThanOrEqual(lastNameModel.maxlength.value);

//     expect(privateId).to.be.a(privateIdModel.type.value);
//     expect(privateId.length)
//       .greaterThanOrEqual(privateIdModel.minlength.value)
//       .lessThanOrEqual(privateIdModel.maxlength.value);
//   });
// });

// describe("addContact failure tests", () => {
//   it("should get error, SELF_STUFF", async () => {
//     const { testUser_0 } = testUsers;
//     await myRequest(testUser_0, SELF_STUFF);
//   });

//   it("should get error, CONTACT_ITEM_EXIST", async () => {
//     const { testUser_2 } = testUsers;

//     //* First one get succeed, but second one is duplicate
//     await myRequest(testUser_2);
//     await myRequest(testUser_2, CONTACT_ITEM_EXIST);
//   });

//   //! Copied from signInNormalApi.spec !//
//   it(`It should get error, CELLPHONE_REQUIRED`, async () => {
//     await myRequest({}, CELLPHONE_REQUIRED);
//   });

//   it(`It should get error, PHONE_NUMBER_REQUIRED`, async () => {
//     await myRequest(
//       {
//         countryCode: cellphone.countryCode,
//         countryName: cellphone.countryName,
//       },
//       PHONE_NUMBER_REQUIRED
//     );
//   });
//   it(`It should get error, PHONE_NUMBER_INVALID_TYPE`, async () => {
//     await myRequest(
//       {
//         countryCode: cellphone.countryCode,
//         countryName: cellphone.countryName,
//         phoneNumber: 9119119191,
//       },
//       PHONE_NUMBER_INVALID_TYPE
//     );
//   });
//   it(`It should get error, PHONE_NUMBER_NUMERIC`, async () => {
//     await myRequest(
//       {
//         countryCode: cellphone.countryCode,
//         countryName: cellphone.countryName,
//         phoneNumber: "9119119191!",
//       },
//       PHONE_NUMBER_NUMERIC
//     );
//   });

//   it(`It should get error, COUNTRY_CODE_REQUIRED`, async () => {
//     await myRequest(
//       {
//         phoneNumber: cellphone.phoneNumber,
//         countryName: cellphone.countryName,
//       },
//       COUNTRY_CODE_REQUIRED
//     );
//   });
//   it(`It should get error, COUNTRY_CODE_NUMERIC`, async () => {
//     await myRequest(
//       {
//         phoneNumber: cellphone.phoneNumber,
//         countryName: cellphone.countryName,
//         countryCode: "98!",
//       },
//       COUNTRY_CODE_NUMERIC
//     );
//   });
//   it(`It should get error, COUNTRY_CODE_INVALID_TYPE`, async () => {
//     await myRequest(
//       {
//         phoneNumber: cellphone.phoneNumber,
//         countryName: cellphone.countryName,
//         countryCode: 98,
//       },
//       COUNTRY_CODE_INVALID_TYPE
//     );
//   });
//   it(`It should get error, COUNTRY_CODE_NOT_SUPPORTED`, async () => {
//     await myRequest(
//       {
//         phoneNumber: cellphone.phoneNumber,
//         countryName: cellphone.countryName,
//         countryCode: "010101",
//       },
//       COUNTRY_CODE_NOT_SUPPORTED
//     );
//   });

//   it(`It should get error, COUNTRY_NAME_REQUIRED`, async () => {
//     await myRequest(
//       {
//         phoneNumber: cellphone.phoneNumber,
//         countryCode: cellphone.countryCode,
//       },
//       COUNTRY_NAME_REQUIRED
//     );
//   });
//   it(`It should get error, COUNTRY_NAME_NOT_SUPPORTED`, async () => {
//     await myRequest(
//       {
//         phoneNumber: cellphone.phoneNumber,
//         countryCode: cellphone.countryCode,
//         countryName: "Something wrong!",
//       },
//       COUNTRY_NAME_NOT_SUPPORTED
//     );
//   });
// });
