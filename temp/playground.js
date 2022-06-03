require("module-alias/register");
require("@/functions/helpers/requireDotenv").requireDotenv();
require("@/variables/globalVariables");

const {
  appErrors: {
    INPUT_FIELDS_OVERLOAD,
    INPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_OVERLOAD,
  },
} = require("@/variables/errors/appErrors");
const {
  getObjectLength,
  customTypeof,
} = require("@/functions/utilities/utils");

const checkOutputFields = (output, fields, fieldsIndex = 0) => {
  logger.log("rm", "start!");

  const selectedFields = fields[fieldsIndex];
  let result = { done: true, internalError: false, errorObject: {} };
  const fn = (internalError = false, errorObject = {}) => {
    result.done = false;
    result.internalError = internalError;
    result.errorObject = errorObject;

    return result;
  };

  if (customTypeof(selectedFields).type.undefined) {
    return fn(true);
  }

  const checkFields = (output, fields) => {
    const outputLength = getObjectLength(output);
    const fieldsLength = getObjectLength(fields);

    logger.log("rm", outputLength, fieldsLength);
    logger.log("rm", output, "\n", fields);

    if (outputLength !== fieldsLength) {
      if (outputLength < fieldsLength) {
        logger.log("rm", "output: ", output);
        logger.log("rm", "fields:", fields);
        return fn(false, OUTPUT_FIELDS_MISSING);
      } else {
        return fn(false, OUTPUT_FIELDS_OVERLOAD);
      }
    }

    for (const key in fields) {
      if (customTypeof(output[key]).type.undefined) {
        fn(OUTPUT_FIELDS_MISSING);
        break;
      }

      if (customTypeof(fields[key]).type.object) {
        if (!customTypeof(output[key]).type.object) {
          fn(OUTPUT_FIELDS_MISSING);
          break;
        }

        result = checkFields(output[key], fields[key]);
      }

      if (customTypeof(fields[key]).type.array) {
        if (!customTypeof(output[key]).type.array) {
          fn(false, OUTPUT_FIELDS_MISSING);
          break;
        }

        // eslint-disable-next-line no-loop-func
        output[key].forEach((item) => {
          result = checkFields(item, fields[key][0]);
        });
      }
    }

    return result;
  };

  checkFields(output, selectedFields);

  return result;
};

logger.log(
  "rm",
  checkOutputFields(
    {
      chatId: "chatId",
      newMessage: "newMessage",
      array: [{ x: "" }],
    },
    [
      {
        chatId: "chatId",
        newMessage: "newMessage",
        array: [{ x: "" }],
      },
    ]
  )
);
