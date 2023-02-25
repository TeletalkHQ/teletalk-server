import { trier } from "simple-trier";

import { commonUtilities } from "@/classes/CommonUtilities";

import { validators } from "@/validators";

const tryToValidateVerificationCode = async (verificationCode) => {
  await validators.verificationCode(verificationCode);
};

const catchValidateVerificationCode = commonUtilities.controllerErrorResponse;

const verificationCodeValidatorMiddleware = async (req, res, next) => {
  const { verificationCode } = req.body;

  await trier(verificationCodeValidatorMiddleware.name)
    .tryAsync(tryToValidateVerificationCode, verificationCode)
    .executeIfNoError(() => next())
    .catch(catchValidateVerificationCode, res)
    .runAsync();
};

export { verificationCodeValidatorMiddleware as verificationCodeValidator };
