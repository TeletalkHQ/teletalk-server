const { userErrorTemplate } = require("~/variables/errors/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");
const { errorThrower } = require("~/functions/utilities/utils");
const { updateUserBlacklist } = require("~/models/userModels/user.model");

const addBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      db: { user },
      body: { phoneNumber, countryCode, countryName },
    } = req;

    const cellphone = { phoneNumber, countryCode, countryName };

    const { cellphone: blacklistItem } = cellphoneFinder(
      user.blacklist,
      cellphone
    );

    errorThrower(
      blacklistItem !== undefined,
      userErrorTemplate.CELLPHONE_EXIST.properties
    );

    await updateUserBlacklist(user);

    res.status(200).json({
      blockedCellphone: cellphone,
    });
  } catch (error) {
    logger.log("addBlockCellphoneController", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { addBlockCellphoneController };
