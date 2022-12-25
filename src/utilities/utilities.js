const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { errorThrower } = require("utility-store/src/functions/utilities");

const getHostFromRequest = (request) => request.get("host");

const isUrlMatchWithReqUrl = (url, reqUrl) =>
  (customTypeof.isArray(url) && url.some((u) => u === reqUrl)) ||
  url === reqUrl;

const crashServer = (message) => {
  logger.error(message).error();
  process.exit(1);
};

const executeMiddlewares = async ({ middlewares, next, req, res }) => {
  for await (const m of middlewares) {
    const result = await m(req, res, () => {});

    if (!result?.ok) {
      return;
    }
  }

  return next();
};

const checkIgnoreApplyMiddlewaresRequirements = (url, middlewares) => {
  errorThrower(
    customTypeof.isNotString(url) && customTypeof.isNotArray(url),
    "url must be string or an array"
  );

  errorThrower(!middlewares.length, "You need to pass at least one middleware");
};

const regexMaker = (pattern) => new RegExp(pattern);

module.exports = {
  checkIgnoreApplyMiddlewaresRequirements,
  crashServer,
  executeMiddlewares,
  getHostFromRequest,
  isUrlMatchWithReqUrl,
  regexMaker,
};

// const mongoose = require("mongoose");

// function NoCastString(key, options) {
// 	mongoose.SchemaType.call(this, key, options, "NoCastString");
// }
// NoCastString.prototype = Object.create(mongoose.SchemaType.prototype);

// NoCastString.prototype.cast = function (str) {
// 	if (customTypeof.check(str).type.string) {
// 		throw new Error(`NoCastString: ${str} is not a string`);
// 	}
// 	return str;
// };

// mongoose.Schema.Types.NoCastString = NoCastString;
