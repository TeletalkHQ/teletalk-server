const { countries } = require("@/variables/others/countries");

const getCountries = async () => {
  return { countries };
};

module.exports = { getCountries };
