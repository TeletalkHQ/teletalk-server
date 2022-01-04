const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");
const { cellphoneFinder } = require("~/function/utility/cellphoneFinder");

const removeBlockCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			body: { cellphone },
		} = req;

		const { cellphone: blacklistItem, cellphoneIndex } = cellphoneFinder({
			cellphones: user.blacklist,
			targetCell: cellphone,
		});

		if (blacklistItem === undefined) {
			const error = userErrorTemplate.CELLPHONE_NOT_EXIST;
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
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { removeBlockCellphoneController };
