import { randomMaker } from "utility-store";

import { authManager } from "@/classes/AuthManager";
import { smsClient } from "@/classes/SmsClient";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { models } from "@/models";

import { utilities } from "@/utilities";

import { validators } from "@/validators";

const signIn = async (req, res) => {
  const verificationCode = utilities.passwordGenerator();
  await validateVerificationCode(verificationCode);

  const cellphone = userUtilities.extractCellphone(req.body);

  const host = getHostFromRequest(req);
  const fullNumber = userUtilities.makeFullNumber(
    cellphone.countryCode,
    cellphone.phoneNumber
  );
  await sendVerificationCode(fullNumber, host, verificationCode);

  const tokenId = createClientId();
  const token = signToken({
    tokenId,
    date: Date.now(),
  });
  authManager.setSessionOnSocket(res, token);
  await addClient(tokenId, {
    ...cellphone,
    isVerified: false,
    verificationCode,
  });
};

const validateVerificationCode = async (verificationCode) => {
  await validators.verificationCode(verificationCode);
};

const sendVerificationCode = async (fullNumber, host, verificationCode) => {
  await smsClient.sendVerificationCode(fullNumber, host, verificationCode);
};

const createClientId = () =>
  randomMaker.id(models.native.user.userId.maxlength.value);

const signToken = (data) => {
  return authManager.signToken(data, authManager.getSignInSecret());
};

const addClient = async (tokenId, data) =>
  await temporaryClients.add(tokenId, data);

export { signIn };
