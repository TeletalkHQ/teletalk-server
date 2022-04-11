const objectInitializer = (values, props) => {
  try {
    const tempObj = {};

    props.forEach((prop, index) => {
      tempObj[prop] = values[index];
    });

    return tempObj;
  } catch (error) {
    logger.log("objectInitializer catch", error);
  }
};

const errorThrower = (condition, error) => {
  if (condition) throw error;
};

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

module.exports = {
  objectInitializer,
  errorThrower,
  isEqualWithTargetCellphone,
};
