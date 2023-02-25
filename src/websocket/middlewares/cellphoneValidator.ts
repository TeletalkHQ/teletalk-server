import { trier } from "simple-trier";

import { commonUtilities } from "@/classes/CommonUtilities";
import { userUtilities } from "@/classes/UserUtilities";

import { validators } from "@/validators";

const cellphoneValidator = async (req, res, next) => {
  return await trier(cellphoneValidator.name)
    .tryAsync(tryToValidateCellphone, req.body)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchValidateCellphone, res)
    .runAsync();
};

const tryToValidateCellphone = async (userData) => {
  const cellphone = userUtilities.extractCellphone(userData);
  await validators.cellphone(cellphone);
  return { ok: true };
};

const executeIfNoError = (_, next) => {
  next();
};

const catchValidateCellphone = (error, res) => {
  commonUtilities.controllerErrorResponse(error, res);
  return { ok: false };
};

export { cellphoneValidator };
