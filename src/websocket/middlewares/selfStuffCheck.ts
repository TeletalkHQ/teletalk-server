import { errorThrower } from "utility-store";
import { isDataHasEqualityWithTargetCellphone } from "utility-store";
import { trier } from "simple-trier";

import { commonUtilities } from "@/classes/CommonUtilities";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { errors } from "@/variables/errors";

const selfStuffCheck = async (req, res, next) => {
  return await trier(selfStuffCheck.name)
    .tryAsync(tryTo, req)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchTryTo, res)
    .runAsync();
};

const tryTo = async (req) => {
  const targetCellphone = req.body;
  const {
    data: {
      payload: { tokenId },
    },
  } = req.authData;

  const currentUser = await services.findOneUserById(tokenId);
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

export { selfStuffCheck };
