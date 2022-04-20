const { objectClarify } = require("~/functions/utilities/objectClarify");
const { errorThrower } = require("~/functions/utilities/utilsNoDeps");

const {
  initialValue,
} = require("~/variables/constants/initialValues/initialValue");

const { modelGeneratorInitialProperties, errorGeneratorInitialProperties } =
  initialValue;

const errorGenerator = (errorCode, statusCode, message, reason, version) => {
  try {
    errorThrower(!errorCode || !statusCode || !reason || !version, {
      errorMessage: `required arguments should be passed`,
      code: errorCode,
      message,
      reason,
      version,
    });

    return {
      properties: { errorCode, statusCode, message, reason },
      info: { version },
    };
  } catch (error) {
    logger.log("errorGenerator catch, error:", error);
  }
};

const routeGenerator = (method, url, statusCode, version, description = "") => {
  try {
    errorThrower(!method || !url || !statusCode || !version, {
      errorMessage: `required arguments should passed`,
      method,
      url,
      version,
    });

    return {
      properties: { method, url, statusCode },
      info: { version, description },
    };
  } catch (error) {
    logger.log("routeGenerator catch, error:", error);
    errorThrower(error, error);
  }
};

const mongooseSchemaPropertyGenerator = (
  type,
  maxlength,
  minlength,
  required,
  unique,
  trim,
  defaultValue,
  lowercase
) => {
  try {
    const schema = {
      defaultValue,
      maxlength,
      minlength,
      required,
      trim,
      type,
      unique,
      lowercase,
    };

    const cleanSchema = objectClarify(schema);

    return cleanSchema;
  } catch (error) {
    logger.log("mongooseSchemaPropertyGenerator catch, error:", error);
  }
};

const modelGenerator = (
  maxlength = modelGeneratorInitialProperties,
  minlength = modelGeneratorInitialProperties,
  required = modelGeneratorInitialProperties,
  trim = modelGeneratorInitialProperties,
  type = modelGeneratorInitialProperties,
  unique = modelGeneratorInitialProperties,
  defaultValue = modelGeneratorInitialProperties,
  version = modelGeneratorInitialProperties,
  lowercase = modelGeneratorInitialProperties,
  length = modelGeneratorInitialProperties
) => {
  try {
    return {
      properties: {
        maxlength,
        minlength,
        required,
        trim,
        type,
        unique,
        default: defaultValue,
        lowercase,
        length,
      },
      info: { version },
    };
  } catch (error) {
    logger.log("modelGenerator catch, error:", error);
  }
};

const modelPropertyGenerator = (
  value,
  error = errorGeneratorInitialProperties
) => {
  try {
    errorThrower(typeof value === "undefined", "Value need to be set!");

    return {
      value,
      error,
    };
  } catch (error) {
    logger.log("modelPropertyGenerator catch, error:", error);
    errorThrower(error, error);
  }
};

module.exports = {
  errorGenerator,
  mongooseSchemaPropertyGenerator,
  routeGenerator,
  modelPropertyGenerator,
  modelGenerator,
};
