const { userError } = require("~/constant/error/userError/userError");

const addBlockCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			cellphone,
		} = req.body;

		const duplicateBlacklistItem = user.blacklist.find((user) => user.cellphone === cellphone);

		if (duplicateBlacklistItem !== undefined) {
			const error = userError.CELLPHONE_EXIST;
			throw error;
		}

		user.blacklist.push({ cellphone });

		await user.updateOne({
			blacklist: user.blacklist,
		});

		res.status(200).json({ blockedCellphone: cellphone, blacklist: user.blacklist });
	} catch (error) {
		console.log("addBlockCellphoneController", error);
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { addBlockCellphoneController };
