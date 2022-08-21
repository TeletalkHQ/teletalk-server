const { randomMaker } = require("@/classes/RandomMaker");
const { dataUsageManager } = require("@/classes/DataUsageManager");
const { envManager } = require("@/classes/EnvironmentManager");
const { stateManager } = require("@/classes/StateManager");

const {
  isDataHasEqualityWithTargetCellphone,
} = require("@/functions/utilities/utils");

const {
  userModels: { firstNameModel, lastNameModel },
} = require("@/models/userModels/userModels");

const { countries } = require("@/variables/others/countries");
const { objectUtilities } = require("./ObjectUtilities");

class UserPropsUtilities {
  constructor(id) {
    this.id = id;
  }

  makeRandomCellphone() {
    const country = countries[randomMaker.randomCountryCode()];
    const cellphone = this.makeCellphoneByParams(
      country.countryCode,
      country.countryName,
      randomMaker.randomStringNumber(10)
    );

    return cellphone;
  }

  makeUnusedRandomCellphone() {
    const cellphone = this.makeRandomCellphone();

    const isCellphoneUsedBefore =
      dataUsageManager.isCellphoneUsedBefore(cellphone);

    if (isCellphoneUsedBefore) {
      this.makeUnusedRandomCellphone();
    } else return cellphone;
  }

  makeUnusedRandomCellphoneAndUpdateUsage() {
    const unusedCellphone = this.makeUnusedRandomCellphone();

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

  concatCountryCodeWithPhoneNumber(countryCode, phoneNumber) {
    return `+${countryCode}${phoneNumber}`;
  }

  makeRandomContact() {
    return {
      ...this.makeRandomCellphone(),
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

  makeFullNameByParams(firstName, lastName) {
    return { firstName, lastName };
  }
  makeRandomFullName() {
    return this.makeFullNameByParams(
      randomMaker.randomString(firstNameModel.maxlength.value),
      randomMaker.randomString(lastNameModel.maxlength.value)
    );
  }

  extractCellphone(object = {}) {
    return {
      countryCode: object.countryCode,
      countryName: object.countryName,
      phoneNumber: object.phoneNumber,
    };
  }
  extractContact(object = {}) {
    return {
      ...this.extractCellphone(object),
      firstName: object.firstName,
      lastName: object.lastName,
      privateId: object.privateId,
    };
  }

  extractDefaultUserData(userObject) {
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

    return objectUtilities.objectClarify({
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
    });
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

  cellphoneFinder(cellphones, targetCellphone) {
    let cellphoneIndex = -1;

    try {
      const cellphone = cellphones.find((cellphone, index) => {
        cellphoneIndex = index;
        return isDataHasEqualityWithTargetCellphone(cellphone, targetCellphone);
      });
      return { cellphone, cellphoneIndex };
    } catch (error) {
      logger.log("cellphoneFinder catch, error:", error);
      throw error;
    }
  }
}

const userPropsUtilities = new UserPropsUtilities();

module.exports = { userPropsUtilities };
