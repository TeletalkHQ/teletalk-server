const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");
const { trier } = require("utility-store/src/classes/Trier");

const tryToClarifyBody = (object) => {
  const clarifiedBody = objectUtilities.objectClarify(object);
  return { clarifiedBody, ok: true };
};

const executeIfNoError = ({ clarifiedBody }, req, next) => {
  req.body = clarifiedBody;
  next();
};

const catchBodyClarify = () => {
  return { ok: false };
};

const bodyClarify = (req, _res, next) => {
  return trier(catchBodyClarify.name)
    .try(tryToClarifyBody, req.body)
    .executeIfNoError(executeIfNoError, req, next)
    .catch(catchBodyClarify)
    .result();
};

module.exports = { bodyClarify };
