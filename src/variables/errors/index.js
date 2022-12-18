const { ioErrors } = require("@/variables/errors/ioErrors");
const { localErrors } = require("@/variables/errors/local");
const { serverErrors } = require("@/variables/errors/server");
const { userErrors } = require("@/variables/errors/user");

const errors = {
  IO: ioErrors,
  ...localErrors,
  ...serverErrors,
  ...userErrors,
};

module.exports = { errors };
