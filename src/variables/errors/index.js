const { serverErrors } = require("@/variables/errors/server");
const { localErrors } = require("@/variables/errors/local");
const { userErrors } = require("@/variables/errors/user");

const errors = {
  ...serverErrors,
  ...localErrors,
  ...userErrors,
};

module.exports = { errors };
