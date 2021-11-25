const { userError } = require("~/constant/error/userError/userError");
const { cellphoneFinder } = require("~/function/utility/cellphoneFinder");

const removeBlockCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			cellphone,
		} = req.body;

		const { cellphone: blacklistItem, cellphoneIndex } = cellphoneFinder({
			cellphones: user.blacklist,
			targetCell: cellphone,
		});

		if (blacklistItem === undefined) {
			const error = userError.CELLPHONE_NOT_EXIST;
			throw error;
		}

		console.log("cellphoneIndex", cellphoneIndex);
		user.blacklist.splice(cellphoneIndex, 1);

		await user.updateOne({
			blacklist: user.blacklist,
		});

		res.status(200).json({
			removedBlockedCellphone: cellphone,
			blacklist: user.blacklist,
		});
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { removeBlockCellphoneController };
