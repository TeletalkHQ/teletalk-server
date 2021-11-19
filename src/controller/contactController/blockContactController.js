const { userError } = require("~/constant/error/userError/userError");

const blockContactController = async (req, res) => {
	try {
		const {
			DB: { user },
			cellphone,
		} = req.body;

		const isDuplicate = user.blacklist.find((cp) => cp === cellphone);

		if (isDuplicate === undefined) {
			if (user.cellphone === cellphone) {
				const error = userError.SELF_STUFF;
				throw error;
			} else {
				await user.updateOne({ blacklist: [...user.blacklist, cellphone] });
				res.status(200).json({ blockPhone: cellphone, blacklist: user.blacklist });
			}
		} else {
			const error = userError.CELLPHONE_EXIST;
			throw error;
		}
	} catch (err) {
		res.errorCollector({ err });
		res.errorResponser();
	}
};

module.exports = { blockContactController };
