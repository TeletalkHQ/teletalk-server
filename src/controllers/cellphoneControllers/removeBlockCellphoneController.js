const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");

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

    const { cellphone: blacklistItem, cellphoneIndex } = cellphoneFinder({
      cellphones: user.blacklist,
      targetCell: cellphone,
    });

    if (blacklistItem === undefined) {
      const error = userErrorTemplate.CELLPHONE_NOT_EXIST;
      throw error;
    }

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
