const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

const {
  appErrors: { UNKNOWN_ERROR },
} = require("@/variables/errors/appErrors");
const { getErrorObject } = require("@/functions/utilities/utilities");

const errorCollectorMiddleware = (res, errorObject) => {
  try {
    const errorToSend = customTypeof.check(errorObject).type.isObject
      ? errorObject
      : UNKNOWN_ERROR;

    res.errors = getErrorObject(errorToSend);
  } catch (error) {
    logger
      .redBright("errorCollectorMiddleware catch! its critical!!!")
      .log(error);
    res.errors = UNKNOWN_ERROR;
    res.errorResponser();
  }
};

module.exports = { errorCollectorMiddleware };
