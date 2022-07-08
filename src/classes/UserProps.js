const { randomMaker } = require("@/classes/RandomMaker");
const { dataUsageManager } = require("@/classes/DataUsageManager");
const { envManager } = require("@/classes/EnvironmentManager");
const { stateManager } = require("@/classes/StateManager");

const {
  userModels: { firstNameModel, lastNameModel },
} = require("@/models/userModels/userModels");

const { countries } = require("@/variables/others/countries");

class UserProps {
  constructor(id) {
    this.id = id;
  }

  makeTestCellphone() {
    const country = countries[randomMaker.randomCountryCode()];
    const cellphone = this.makeCellphoneByParams(
      country.countryCode,
      country.countryName,
      randomMaker.randomStringNumber(10)
    );

    return cellphone;
  }

  makeUnusedTestCellphone() {
    const cellphone = this.makeTestCellphone();

    const isCellphoneUsedBefore =
      dataUsageManager.isCellphoneUsedBefore(cellphone);

    if (isCellphoneUsedBefore) {
      this.makeUnusedTestCellphone();
    } else return cellphone;
  }

  makeUnusedTestCellphoneAndUpdateUsage() {
    const unusedCellphone = this.makeUnusedTestCellphone();

    dataUsageManager.addUsedCellphone(unusedCellphone);

    return unusedCellphone;
  }

  makeCellphoneByParams(countryCode, countryName, phoneNumber) {
    return {
      countryCode,
      countryName,
      phoneNumber,
    };
  }

  makeTestContact() {
    return {
      ...this.makeTestCellphone(),
      firstName: randomMaker.randomString(firstNameModel.maxlength.value),
      lastName: randomMaker.randomString(lastNameModel.maxlength.value),
    };
  }

  makeContactByParams(cellphone, firstName, lastName) {
    return {
      ...cellphone,
      firstName,
      lastName,
    };
  }

  makeFullNameByParam(firstName, lastName) {
    return { firstName, lastName };
  }
  makeTestFullName() {
    return this.makeFullNameByParam(
      randomMaker.randomString(firstNameModel.maxlength.value),
      randomMaker.randomString(lastNameModel.maxlength.value)
    );
  }

  makeCellphoneByObjectParam(object = {}) {
    return {
      countryCode: object.countryCode,
      countryName: object.countryName,
      phoneNumber: object.phoneNumber,
    };
  }
  makeContactObjectByParam(object = {}) {
    return {
      ...this.makeCellphoneByObjectParam(object),
      firstName: object.firstName,
      lastName: object.lastName,
      privateId: object.privateId,
    };
  }

  makeDefaultUserObjectByParam(userObject) {
    const {
      bio,
      blacklist,
      chats,
      contacts,
      countryCode,
      countryName,
      firstName,
      lastName,
      phoneNumber,
      privateId,
      tokens,
      username,
    } = userObject;

    return {
      bio,
      blacklist,
      chats,
      contacts,
      countryCode,
      countryName,
      firstName,
      lastName,
      phoneNumber,
      privateId,
      tokens,
      username,
    };
  }

  getTokenFromUserObjectByParam(userObject) {
    return userObject.tokens[0]?.mainToken;
  }

  getTestVerificationCode() {
    const { TEST_VERIFICATION_CODE } = envManager.ENVIRONMENT_KEYS;
    return envManager.getEnvironment(TEST_VERIFICATION_CODE);
  }
  setTestVerificationCode(verificationCode) {
    const { TEST_VERIFICATION_CODE } = envManager.ENVIRONMENT_KEYS;
    envManager.setEnvironment(TEST_VERIFICATION_CODE, verificationCode);
  }

  async setTestUsers(testUsers) {
    const { testUsers: stateKey } = stateManager.stateKeys;
    return await stateManager.setState(stateKey, testUsers);
  }
  setTestVerifyToken(token) {
    const { TEST_VERIFY_TOKEN } = envManager.ENVIRONMENT_KEYS;
    envManager.setEnvironment(TEST_VERIFY_TOKEN, token);
  }
}

const userProps = new UserProps();

module.exports = { userProps };
