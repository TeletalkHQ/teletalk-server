const Validator = require("fastest-validator");
const {
  cellphoneValidation,
  verificationCodeValidation,
} = require("~/validator/userPartValidator/indexUserPartValidator");

const v = new Validator();

const verifyLoginNormalUserValidation = {
  ...cellphoneValidation,
  ...verificationCodeValidation,
};

const verifyLoginNormalUserValidator = v.compile(
  verifyLoginNormalUserValidation
);

module.exports = { verifyLoginNormalUserValidator };
