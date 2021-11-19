const { userError } = require("~/constant/error/userError/userError");

const addContactController = async (req, res) => {
	try {
		const {
			DB: { user },
			cellphone,
		} = req.body;

		const isDuplicate = user.contacts.find((cp) => cp === cellphone);

		if (isDuplicate === undefined) {
			if (user.cellphone === cellphone) {
				const error = userError.SELF_STUFF;
				throw error;
			} else {
				await user.updateOne({ contacts: [...user.contacts, cellphone] });
			}
		} else {
			const error = userError.CELLPHONE_EXIST;
			throw error;
		}

		res.status(200).json({ cellphone, user });
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { addContactController };
