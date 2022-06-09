const { randomMaker } = require("@/functions/helpers/RandomMaker");

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
    const cellphone = this.makeCellphone(
      country.countryCode,
      country.countryName,
      randomMaker.randomStringNumber(10)
    );

    return cellphone;
  }

  makeCellphone(countryCode, countryName, phoneNumber) {
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

  makeContact(cellphone, firstName, lastName) {
    return {
      ...cellphone,
      firstName,
      lastName,
    };
  }

  makeFullName(firstName, lastName) {
    return { firstName, lastName };
  }

  makeTestFullName() {
    return this.makeFullName(
      randomMaker.randomString(firstNameModel.maxlength.value),
      randomMaker.randomString(lastNameModel.maxlength.value)
    );
  }

  getCellphone(object = {}) {
    return {
      countryCode: object.countryCode,
      countryName: object.countryName,
      phoneNumber: object.phoneNumber,
    };
  }

  getContact(object = {}) {
    return {
      ...this.getCellphone(object),
      firstName: object.firstName,
      lastName: object.lastName,
      privateId: object.privateId,
    };
  }

  getTokenFromUserObject(userObject) {
    return userObject.tokens[0].mainToken;
  }
}

const userProps = new UserProps();

module.exports = { userProps };
