import { errorThrower } from "utility-store/src/utilities/utilities";
import { randomMaker } from "utility-store/src/classes/RandomMaker";

import { authManager } from "@/classes/AuthManager";
import { controllerBuilder } from "@/classes/ControllerBuilder";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { models } from "@/models";

import { services } from "@/services";

import { validators } from "@/validators";

import { errors } from "@/variables/errors";

const tryToCreateNewUser = async (req, res) => {
  const {
    authData: {
      data: {
        payload: { tokenId },
      },
    },
    body: { firstName, lastName },
  } = req;

  const client = await findClient(tokenId);
  checkClient(client);
  const cellphone = userUtilities.extractCellphone(client);

  await validators.firstName(firstName);
  await validators.lastName(lastName);
  await checkExistenceOfUser(cellphone);

  const userId = getRandomId();
  const token = signToken(userId);
  authManager.setTokenToResponse(res, token);

  await saveNewUser({
    ...userUtilities.defaultUserData(),
    ...cellphone,
    firstName,
    lastName,
    createdAt: Date.now(),
    userId,
    sessions: [{ token }],
  });

  await removeTemporaryClient(client.tokenId);
};

const findClient = async (tokenId) => await temporaryClients.find(tokenId);

const checkClient = (client) => {
  errorThrower(!client, errors.TEMPORARY_CLIENT_NOT_FOUND);
  errorThrower(!client.isVerified, {
    ...errors.TEMPORARY_CLIENT_NOT_VERIFIED,
    createNewUser: "failed",
  });
};

const checkExistenceOfUser = async (cellphone) => {
  const foundUser = await services.findOneUser(cellphone);
  errorThrower(foundUser, () => errors.USER_EXIST);
  return foundUser;
};

const getRandomId = () =>
  randomMaker.id(models.native.user.userId.maxlength.value);

const signToken = (tokenId) => {
  return authManager.signToken({
    tokenId,
    date: Date.now(),
  });
};

const saveNewUser = async (userDataForDatabase) => {
  await services.createNewUser().run(userDataForDatabase);
};

const removeTemporaryClient = async (cellphone) => {
  await temporaryClients.remove(cellphone);
};

const createNewUser = controllerBuilder
  .create()
  .body(tryToCreateNewUser)
  .build();

export { createNewUser };
