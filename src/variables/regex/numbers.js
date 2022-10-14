const { regexMaker } = require("@/functions/utilities/utilities");

const enNumber = regexMaker("^[0-9]+$");

const numbers = { enNumber };

module.exports = { numbers };
