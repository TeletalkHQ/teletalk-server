const {
  isDataHasEqualityWithTargetCellphone,
} = require("utility-store/src/utilities/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { commonUtilities } = require("@/classes/CommonUtilities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("utility-store/src/utilities/utilities");

const { errors } = require("@/variables/errors");

const cellphoneSelfStuffCheck = (req, res, next) => {
  return trier(cellphoneSelfStuffCheck.name)
    .try(tryTo, req)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchTryTo, res)
    .run();
};

const tryTo = (req) => {
  const targetCellphone = req.body;
  const { payload: userData } = req.authData;
  const cellphone = userPropsUtilities.extractCellphone(userData);

  errorThrower(
    isDataHasEqualityWithTargetCellphone(cellphone, targetCellphone),
    () => ({ ...errors.SELF_STUFF, targetCellphone })
  );
  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchTryTo = (error, res) => {
  commonUtilities.controllerErrorResponse(error, res);
  return { ok: false };
};

module.exports = { cellphoneSelfStuffCheck };
