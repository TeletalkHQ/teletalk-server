const { customTypeof } = require("custom-typeof");
const { trier } = require("utility-store/src/classes/Trier");

const { commonUtilities } = require("@/classes/CommonUtilities");

const { errorThrower } = require("utility-store/src/utilities/utilities");

const { errors } = require("@/variables/errors");

const isRouteObjectInvalid = ({
  fullUrl,
  inputFields,
  outputFields,
  url,
} = {}) => customTypeof.isUndefined(fullUrl, inputFields, outputFields, url);

const tryToValidateRouteObject = (routeObject) => {
  errorThrower(isRouteObjectInvalid(routeObject), errors.ROUTE_NOT_FOUND);
};

const catchValidateRouteObject = commonUtilities.controllerErrorResponse;

const notFound = (req, res, next) => {
  trier(notFound.name)
    .try(tryToValidateRouteObject, req.routeObject)
    .executeIfNoError(() => next())
    .catch(catchValidateRouteObject, res)
    .run();
};

module.exports = { notFound };
