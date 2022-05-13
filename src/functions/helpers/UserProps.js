const {
  randomCountryCode,
  randomStringNumber,
  randomString,
} = require("@/functions/utilities/utils");

const {
  userModels: { firstNameModel, lastNameModel },
} = require("@/models/userModels/userModels");

const { countries } = require("@/variables/constants/countries");

class UserProps {
  constructor(id) {
    this.id = id;
  }

  makeTestCellphone() {
    const country = countries[randomCountryCode()];
    const cellphone = this.makeCellphone(
      country.countryCode,
      country.countryName,
      randomStringNumber(10)
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
      firstName: randomString(firstNameModel.maxlength.value),
      lastName: randomString(lastNameModel.maxlength.value),
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
      randomString(firstNameModel.maxlength.value),
      randomString(lastNameModel.maxlength.value)
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
}

const userProps = new UserProps();

module.exports = { userProps };
