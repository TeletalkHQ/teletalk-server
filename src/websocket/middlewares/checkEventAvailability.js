const { customTypeof } = require("custom-typeof");

const { errors } = require("@/variables/errors");

const { arrayOfRoutes } = require("@/websocket/events");
const { errorThrower } = require("utility-store/src/utilities/utilities");

const checkEventAvailability = (_socket, next, [name]) => {
  const foundEvent = arrayOfRoutes.find((item) => item.name === name);

  errorThrower(isEventInvalid(foundEvent), {
    ...errors.EVENT_NOT_FOUND,
    event: name,
  });

  next();
};

const isEventInvalid = ({
  inputFields,
  method,
  name,
  outputFields,
  statusCode,
} = {}) =>
  customTypeof.isUndefined(inputFields, method, name, outputFields, statusCode);

module.exports = { checkEventAvailability };
