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

const skipParams = (count) => {
  return Array.from({ length: count });
};

const isFunction = (...items) => {
  return items.some((i) => typeof i === "function");
};

const ignoreMiddlewaresByUrl = async (url, ...middlewares) => {
  try {
    errorThrower(
      typeof url !== "string" && !Array.isArray(url),
      "url must be string or an array"
    );

    errorThrower(
      !middlewares.length,
      "You need to pass at least one middleware"
    );

    return async (req, res, next) => {
      errorThrower(
        isFunction(req, res, next),
        "You need to pass this tree item: [req, res, next]"
      );

      if (
        (Array.isArray(url) && url.some((u) => u === req.url)) ||
        url === req.url
      ) {
        return next();
      }

      for await (const md of middlewares) {
        await md(req, res, next);
      }
    };
  } catch (error) {
    logger.log("ignoreMiddlewaresByUrl catch, error:", error);
  }
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
  errorThrower,
  isEqualWithTargetCellphone,
  ignoreMiddlewaresByUrl,
  objectInitializer,
  skipParams,
};
