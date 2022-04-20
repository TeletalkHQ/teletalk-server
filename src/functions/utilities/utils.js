const {
  ENVIRONMENT_KEYS,
  ENVIRONMENT_VALUES,
} = require("~/variables/constants/environmentInitialValues");

const { userRoutes } = require("~/variables/routes/userRoutes");
const { getEnvironment } = require("~/functions/utilities/utilsNoDeps");

const isEqualWithTargetCellphone = (cellphone, targetCell) => {
  if (
    cellphone.phoneNumber === targetCell.phoneNumber &&
    cellphone.countryCode === targetCell.countryCode &&
    cellphone.countryName === targetCell.countryName
  ) {
    return true;
  }

  return false;
};

const getTokenFromRequest = (request) => {
  const NODE_ENV = getEnvironment(ENVIRONMENT_KEYS.NODE_ENV);

  if (NODE_ENV === ENVIRONMENT_VALUES.NODE_ENV.test) {
    logger.log("getTokenFromRequest request.url", request.url);
    if (
      request.url.includes(
        userRoutes.properties.verifySignInNormal.properties.url
      )
    ) {
      return getEnvironment(ENVIRONMENT_KEYS.TEST_VERIFY_TOKEN);
    }

    return getEnvironment(ENVIRONMENT_KEYS.TEST_MAIN_TOKEN);
  }
  return request.headers.authorization?.split("Bearer ")[1];
};

module.exports = {
  getTokenFromRequest,
  isEqualWithTargetCellphone,
};

// const mongoose = require("mongoose");

// function NoCastString(key, options) {
// 	mongoose.SchemaType.call(this, key, options, "NoCastString");
// }
// NoCastString.prototype = Object.create(mongoose.SchemaType.prototype);

// NoCastString.prototype.cast = function (str) {
// 	if (typeof str !== "string") {
// 		throw new Error(`NoCastString: ${str} is not a string`);
// 	}
// 	return str;
// };

// mongoose.Schema.Types.NoCastString = NoCastString;
