const { userError } = require("~/constant/error/userError/userError");

const addBlockCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			cellphone,
			firstName,
			lastName,
		} = req.body;

		const duplicateBlacklistItem = user.blacklist.find((user) => user.cellphone === cellphone);

		if (user.cellphone === cellphone) {
			const error = userError.SELF_STUFF;
			throw error;
		}

		if (duplicateBlacklistItem !== undefined) {
			const error = userError.CELLPHONE_EXIST;
			throw error;
		}

		await user.updateOne({
			blacklist: [...user.blacklist, { cellphone, firstName, lastName }],
		});

		res.status(200).json({ blockPhone: cellphone, blacklist: user.blacklist });
	} catch (err) {
		res.errorCollector({ err });
		res.errorResponser();
	}
};

module.exports = { addBlockCellphoneController };
