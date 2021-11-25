const { userError } = require("~/constant/error/userError/userError");

const addContactCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			firstName,
			lastName,
			cellphone,
			cellphone: { phoneNumber },
		} = req.body;

		//FIXME //! countryName and countryCode should check
		if (user.phoneNumber === phoneNumber) {
			const error = userError.SELF_STUFF;
			throw error;
		}

		const duplicateContact = user.contacts.find(
			(contact) => contact.phoneNumber === phoneNumber,
		);

		if (duplicateContact !== undefined) {
			const error = userError.CELLPHONE_EXIST;
			throw error;
		}

		await user.updateOne({
			contacts: [...user.contacts, { ...cellphone, firstName, lastName }],
		});

		res.status(200).json({ cellphone });
	} catch (error) {
		console.log("addContactCellphoneController", error);
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { addContactCellphoneController };
