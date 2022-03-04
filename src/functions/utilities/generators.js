const {
  initialValue,
} = require("~/variables/constants/initialValues/initialValue");
const { objectClarify } = require("~/functions/utilities/objectClarify");

const { initialSchemaPropertyKey } = initialValue;

const errorTemplateGenerator = (
  errorCode,
  statusCode,
  message,
  reason,
  version
) => {
  try {
    if (!errorCode || !statusCode || !reason || !version) {
      const error = {
        errorMessage: `required arguments should be passed`,
        code: errorCode,
        message,
        reason,
        version,
      };

      throw error;
    }
    return {
      properties: { errorCode, statusCode, message, reason },
      info: { version },
    };
  } catch (error) {
    console.log("errorTemplateGenerator catch, error:", error);
  }
};

const routeTemplateGenerator = (
  method,
  route,
  statusCode,
  version,
  description = ""
) => {
  try {
    if (!method || !route || !statusCode || !version) {
      const error = {
        errorMessage: `required arguments should passed`,
        method,
        route,
        version,
      };

      throw error;
    }
    return {
      properties: { method, route, statusCode },
      info: { version, description },
    };
  } catch (error) {
    console.log("routeTemplateGenerator catch, error:", error);
  }
};

const mongooseSchemaGenerator = (
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

    const cleanSchema = objectClarify({ dirtyObject: schema })?.cleanObject;

    return cleanSchema;
  } catch (error) {
    logger.log("mongooseSchemaGenerator catch, error:", error);
  }
};

const schemaTemplateGenerator = (
  maxlength = initialSchemaPropertyKey,
  minlength = initialSchemaPropertyKey,
  required = initialSchemaPropertyKey,
  trim = initialSchemaPropertyKey,
  type = initialSchemaPropertyKey,
  unique = initialSchemaPropertyKey,
  defaultValue = initialSchemaPropertyKey,
  version = initialSchemaPropertyKey,
  lowercase = initialSchemaPropertyKey,
  length = initialSchemaPropertyKey
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
    logger.log("schemaTemplateGenerator catch, error:", error);
  }
};

const schemaPropertyKeyGenerator = (
  value,
  error = {
    reason: "Not set!",
    message: "Not set!",
    code: "Not set!",
    version: "Not set!",
  }
) => {
  if (typeof value === "undefined") {
    const error = "Value need to be set!";
    throw error;
  }

  try {
    return {
      value,
      error,
    };
  } catch (error) {
    logger.log("schemaPropertyKeyGenerator catch, error:", error);
  }
};

module.exports = {
  errorTemplateGenerator,
  mongooseSchemaGenerator,
  routeTemplateGenerator,
  schemaPropertyKeyGenerator,
  schemaTemplateGenerator,
};
