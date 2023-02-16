const { customTypeof } = require("custom-typeof");
const { trier } = require("simple-trier");

const { commonUtilities } = require("@/classes/CommonUtilities");

const { errorThrower } = require("utility-store/src/utilities/utilities");

const { errors } = require("@/variables/errors");

const isRouteInvalid = ({ fullUrl, inputFields, outputFields, url } = {}) =>
  customTypeof.isUndefined(fullUrl, inputFields, outputFields, url);

const tryToValidateRoute = (req) => {
  errorThrower(isRouteInvalid(req.custom.route), {
    ...errors.ROUTE_NOT_FOUND,
    route: req.custom.route,
  });
};

const catchValidateRoute = commonUtilities.controllerErrorResponse;

const notFound = (req, res, next) => {
  trier(notFound.name)
    .try(tryToValidateRoute, req)
    .executeIfNoError(next)
    .catch(catchValidateRoute, res)
    .run();
};

module.exports = { notFound };
