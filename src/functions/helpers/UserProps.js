const { countries } = require("@/variables/constants/countries");
const {
  randomCountryCode,
  randomStringNumber,
} = require("../utilities/utilsNoDeps");

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

module.exports = { userProps, UserProps: UserProps };
