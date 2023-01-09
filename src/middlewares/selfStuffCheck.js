const { errorThrower } = require("utility-store/src/utilities/utilities");
const {
  isDataHasEqualityWithTargetCellphone,
} = require("utility-store/src/utilities/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { commonUtilities } = require("@/classes/CommonUtilities");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const { errors } = require("@/variables/errors");

const selfStuffCheck = async (req, res, next) => {
  return await trier(selfStuffCheck.name)
    .tryAsync(tryTo, req)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchTryTo, res)
    .runAsync();
};

const tryTo = async (req) => {
  const targetCellphone = req.body;
  const { payload: userData } = req.authData;

  const currentUser = await services.findOneUserById(userData.userId);
  const currentUserCellphone = userUtilities.extractCellphone(currentUser);
  errorThrower(
    isDataHasEqualityWithTargetCellphone(currentUserCellphone, targetCellphone),
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

module.exports = { selfStuffCheck };
