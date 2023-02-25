//UNUSED
import { customTypeof } from "custom-typeof";

import { trier } from "simple-trier";
import { errorThrower } from "utility-store/src/utilities/utilities";

import { commonUtilities } from "@/classes/CommonUtilities";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { errors } from "@/variables/errors";

const findTargetUserByCellphone = async (req, res, next) => {
  await trier(findTargetUserByCellphone.name)
    .tryAsync(tryToFindUserByCellphone, req.body)
    .executeIfNoError(executeInNoError, req, next)
    .catch(catchFindUserByCellphone, res)
    .runAsync();
};

const tryToFindUserByCellphone = async (requestData) => {
  const cellphone = userUtilities.extractCellphone(requestData);

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

export { findTargetUserByCellphone };
