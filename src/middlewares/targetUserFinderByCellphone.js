const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { commonUtilities } = require("@/classes/CommonUtilities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("utility-store/src/functions/utilities");

const { services } = require("@/services");

const { errors } = require("@/variables/errors");

const targetUserFinderByCellphone = async (req, res, next) => {
  await trier(targetUserFinderByCellphone.name)
    .tryAsync(tryToFindUserByCellphone, req.body)
    .executeIfNoError(executeInNoError, req, next)
    .catch(catchFindUserByCellphone, res)
    .runAsync();
};

const tryToFindUserByCellphone = async (requestData) => {
  const cellphone = userPropsUtilities.extractCellphone(requestData);

  const targetUser = await services.findOneUser(cellphone);

  errorThrower(customTypeof.isNull(targetUser), {
    ...cellphone,
    ...errors.TARGET_USER_NOT_EXIST,
  });

  return { ok: true, targetUser };
};

const executeInNoError = ({ targetUser }, req, next) => {
  req.db = { ...req.db, targetUser };
  next();
};

const catchFindUserByCellphone = (error, res) => {
  commonUtilities.controllerErrorResponse(error, res);
  return { ok: false };
};

module.exports = { targetUserFinderByCellphone };
