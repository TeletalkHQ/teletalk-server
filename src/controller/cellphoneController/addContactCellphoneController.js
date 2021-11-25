const { userError } = require("~/constant/error/userError/userError");

const addContactCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			phoneNumber,
			firstName,
			lastName,
			countryCode,
			countryName,
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

		const cellphone = {
			phoneNumber,
			countryCode,
			countryName,
		};

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
