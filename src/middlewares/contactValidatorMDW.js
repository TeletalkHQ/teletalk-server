const { errorThrower } = require("~/functions/utilities/utils");
const {
  contactValidator,
} = require("~/validators/userValidators/contactValidator");

const contactValidatorMDW = async (req, res, next) => {
  try {
    const { phoneNumber, countryCode, countryName, firstName, lastName } =
      req.body;

    const cellphone = { phoneNumber, countryCode, countryName };

    const validationResult = await contactValidator({
      ...cellphone,
      firstName,
      lastName,
    });

    errorThrower(validationResult !== true, validationResult);

    next();
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { contactValidatorMDW };
