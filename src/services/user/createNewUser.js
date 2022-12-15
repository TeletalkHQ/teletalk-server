const { trier } = require("utility-store/src/classes/Trier");

const { User } = require("@/models/database/mongoDb/user");

const createNewUser = async (userData) => {
  const tryToCreateNewNormalUser = async (userData) => {
    await User.create(userData);
    return { ok: true };
  };

  return (
    await trier(createNewUser.name).tryAsync(tryToCreateNewNormalUser, userData)
  )
    .printAndThrow()
    .result();
};

module.exports = { createNewUser };
