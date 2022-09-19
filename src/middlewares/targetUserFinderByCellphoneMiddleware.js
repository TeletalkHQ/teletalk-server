const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");
const { userFinder } = require("@/functions/helpers/userFinder");

const {
  userErrors: { CELLPHONE_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const tryToFindUserByCellphone = async (requestData) => {
  const cellphone = userPropsUtilities.extractCellphone(requestData);

  const targetUser = await userFinder(cellphone);

  errorThrower(customTypeof.isNull(targetUser), {
    ...cellphone,
    ...CELLPHONE_NOT_EXIST,
  });

  return { ok: true, targetUser };
};

const executeInNoError = ({ targetUser }, req, next) => {
  req.db = { ...req.db, targetUser };
  next();
};

const catchFindUserByCellphone = (error, res) => {
  commonFunctionalities.controllerCatchResponse(error, res);
  return { ok: false };
};
//DEPRECATED
//UNUSED
const targetUserFinderByCellphoneMiddleware = async (req, res, next) => {
  (
    await trier(targetUserFinderByCellphoneMiddleware.name).tryAsync(
      tryToFindUserByCellphone,
      req.body
    )
  )
    .executeIfNoError(executeInNoError, req, next)
    .catch(catchFindUserByCellphone, res)
    .result();
};

module.exports = { targetUserFinderByCellphoneMiddleware };
