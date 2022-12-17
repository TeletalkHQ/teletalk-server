const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { errorThrower } = require("utility-store/src/functions/utilities");

const { errors } = require("@/variables/errors");

const isRouteObjectInvalid = ({ fullUrl, inputFields, outputFields, url }) =>
  customTypeof.isUndefined(fullUrl, inputFields, outputFields, url);

const tryToValidateRouteObject = (routeObject) => {
  errorThrower(isRouteObjectInvalid(routeObject), errors.ROUTE_NOT_FOUND);
};

const catchValidateRouteObject = commonFunctionalities.controllerErrorResponse;

//TODO: Add some tests
const notFound = (req, res, next) => {
  trier(notFound.name)
    .try(tryToValidateRouteObject, req.routeObject)
    .executeIfNoError(() => next())
    .catch(catchValidateRouteObject, res);
};

module.exports = { notFound };
