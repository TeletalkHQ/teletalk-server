const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");

const { validators } = require("@/validators");

const { errors } = require("@/variables/errors");

const auth = async (socket, next) => {
  await trier(auth.name)
    .tryAsync(tryBlock, socket)
    .executeIfNoError(executeIfNoError, socket, next)
    .throw()
    .runAsync();
};

const tryBlock = async (socket = socketIntellisense) => {
  if (!socket.handshake.headers.cookie) throw errors.TOKEN_REQUIRED;

  const token = authManager.getTokenFromSocket(socket);

  const validationResult = await validators.token(
    token,
    authManager.getMainSecret()
  );

  return { validationResult };
};

const executeIfNoError = (
  { validationResult },
  socket = socketIntellisense,
  next
) => {
  socket.authData = validationResult;
  next();
};

module.exports = {
  auth,
};
