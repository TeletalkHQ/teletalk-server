const { userError } = require("~/constant/error/userError/userError");

const addContactController = async (req, res) => {
	try {
		const {
			DB: { user },
			cellphone,
		} = req.body;
		console.log(user);
		const isDuplicate = user.contacts.find((cp) => cp === cellphone);
		console.log(isDuplicate);
		if (isDuplicate === undefined) {
			if (user.cellphone === cellphone) {
				const error = userError.SELF_STUFF;
				throw error;
			} else {
				await user.update({ contacts: [...user.contacts, cellphone] });
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
