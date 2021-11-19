const { userError } = require("~/constant/error/userError/userError");

const blockContactController = (req, res) => {
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
				user.blacklist.push(cellphone);
				user.save();
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
