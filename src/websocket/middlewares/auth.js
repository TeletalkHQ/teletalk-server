const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");

const { validators } = require("@/validators");

const { errors } = require("@/variables/errors");

const auth = async (socket, next) => {
  await trier(auth.name)
    .tryAsync(tryToValidateToken, socket)
    .executeIfNoError(executeIfNoError, socket, next)
    .catch(catchAuthDefault, socket, next)
    .runAsync();
};

const tryToValidateToken = async (socket = ioSocket) => {
  if (!socket.handshake.headers.cookie) throw errors.TOKEN_REQUIRED;

  const token = authManager.getTokenFromSocket(socket);

  const validationResult = await validators.token(
    token,
    authManager.getMainSecret()
  );

  return { validationResult };
};

const executeIfNoError = ({ validationResult }, socket = ioSocket, next) => {
  socket.authData = validationResult;
  next();
};

const catchAuthDefault = (error, socket = ioSocket) => {
  socket.emit("unauthorized", error);
};

module.exports = {
  auth,
};
