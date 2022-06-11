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

// const {
//   PrivateChatModel,
// } = require("@/models/chatModels/privateChatMongoModel");
// const { UserMongoModel } = require("@/models/userModels/userMongoModel");
// const { errorThrower } = require("@/functions/utilities/utils");
const models = { UserMongoModel, PrivateChatModel };
const initialOptions = {
  model: "UserMongoModel",
  findMethod: "findOne",
  findParameters: {},
};
const targetFinder = async (data = initialOptions) => {
  try {
    errorThrower(!data, "Yo, send data to find your target :| ");
    const parameters = {
      ...initialOptions,
      ...data,
    };

    return await models[parameters.model][parameters.findMethod]({
      ...parameters.findParameters,
    });
  } catch (error) {
    logger.log("userFinder catch, error:", error);
    errorThrower(error, error);
  }
};
