const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");
const { cellphoneFinder } = require("~/function/utility/cellphoneFinder");

const addBlockCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			body: { cellphone },
		} = req;

		const { cellphone: blacklistItem } = cellphoneFinder({
			cellphones: user.blacklist,
			targetCell: cellphone,
		});

		if (blacklistItem !== undefined) {
			const error = userErrorTemplate.CELLPHONE_EXIST;
			throw error;
		}

		user.blacklist.push(cellphone);

		await user.updateOne({
			blacklist: user.blacklist,
		});

		res.status(200).json({
			blockedCellphone: cellphone,
			blacklist: user.blacklist,
		});
	} catch (error) {
		console.log("addBlockCellphoneController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { addBlockCellphoneController };
