const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");
const { errorThrower } = require("~/functions/utilities/utils");

const removeBlockCellphoneController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      db: { user },
      body: { phoneNumber, countryCode, countryName },
    } = req;

    const cellphone = { phoneNumber, countryCode, countryName };

    const { cellphone: blacklistItem, cellphoneIndex } = cellphoneFinder(
      user.blacklist,
      cellphone
    );

    errorThrower(
      blacklistItem === undefined,
      userErrorTemplate.CELLPHONE_NOT_EXIST
    );

    user.blacklist.splice(cellphoneIndex, 1);

    await user.updateOne({
      blacklist: user.blacklist,
    });

    res.status(200).json({
      removedBlockedCellphone: cellphone,
    });
  } catch (error) {
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { removeBlockCellphoneController };
