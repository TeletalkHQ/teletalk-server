const { countries } = require("@/variables/others/countries");
const { controllerBuilder } = require("@/classes/ControllerBuilder");

const tryToGetCountries = async () => {
  return { countries };
};

const getCountries = controllerBuilder.create().body(tryToGetCountries).build();

module.exports = { getCountries };
