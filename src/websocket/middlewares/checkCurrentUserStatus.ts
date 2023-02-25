const { errorThrower } = require("utility-store/src/utilities/utilities");
const { trier } = require("simple-trier");

const { authManager } = require("@/classes/AuthManager");

const { services } = require("@/services");

const { errors } = require("@/variables/errors");

const checkCurrentUserStatus = async (socket, next) => {
  return await trier(checkCurrentUserStatus.name)
    .tryAsync(tryBlock, socket)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .runAsync();
};

const tryBlock = async (socket) => {
  const error = errors.CURRENT_USER_NOT_EXIST;

  const {
    data: {
      payload: { tokenId },
    },
  } = socket.authData;
  const currentUser = await services.findOneUser({ userId: tokenId });
  errorThrower(!currentUser, {
    ...error,
    wrongTokenId: tokenId,
  });
  errorThrower(currentUser.userId !== tokenId, {
    ...error,
    wrongTokenId: tokenId,
  });

  const token = authManager.getTokenFromSocket(socket);
  const isSessionExist = currentUser.sessions.some((t) => t.token === token);
  errorThrower(!isSessionExist, {
    ...error,
    isSessionExist,
  });

  return {
    currentUser,
  };
};

const executeIfNoError = (_data, next) => {
  next();
};

module.exports = { checkCurrentUserStatus };
