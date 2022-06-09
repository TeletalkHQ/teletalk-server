const { objectClarify } = require("@/functions/utilities/objectClarify");
const { errorThrower, customTypeof } = require("@/functions/utilities/utils");

const { initialOptions } = require("@/variables/others/initialOptions");

const { modelGeneratorInitialProperties, errorGeneratorInitialProperties } =
  initialOptions;

const errorGenerator = (
  errorCode,
  statusCode,
  message,
  errorReason,
  version,
  errorKey
) => {
  try {
    errorThrower(!errorCode || !statusCode || !errorReason || !version, {
      errorMessage: `required arguments should be passed`,
      code: errorCode,
      message,
      reason: errorReason,
      version,
    });

    return {
      errorCode,
      errorKey,
      message,
      reason: errorReason,
      statusCode,
      version,
    };
  } catch (error) {
    logger.log("errorGenerator catch, error:", error);
  }
};

const routeGenerator = (
  method,
  url,
  statusCode,
  version,
  description = "",
  inputFields,
  outputFields
) => {
  try {
    errorThrower(!method || !url || !statusCode || !version, {
      errorMessage: `required arguments should passed`,
      method,
      url,
      version,
    });

    return {
      description,
      inputFields,
      method,
      outputFields,
      statusCode,
      url,
      version,
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
      lowercase,
      maxlength,
      minlength,
      required,
      trim,
      type,
      unique,
    };

    const cleanSchema = objectClarify(schema);

    return cleanSchema;
  } catch (error) {
    logger.log("mongooseSchemaPropertyGenerator catch, error:", error);
  }
};

//!DEPRECATED
// eslint-disable-next-line no-unused-vars
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
  length = modelGeneratorInitialProperties,
  numeric = modelGeneratorInitialProperties,
  empty = modelGeneratorInitialProperties
) => {
  try {
    return {
      maxlength,
      minlength,
      required,
      trim,
      type,
      unique,
      default: defaultValue,
      lowercase,
      length,
      numeric,
      empty,
      version,
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
    errorThrower(customTypeof(value).type.undefined, "Value need to be set!");

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
};
