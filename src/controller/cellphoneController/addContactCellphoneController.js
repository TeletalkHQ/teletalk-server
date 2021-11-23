const { userError } = require("~/constant/error/userError/userError");
const { contactValidator } = require("~/validator/userPartValidator/contactValidator");

const addContactCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			cellphone,
			firstName,
			lastName,
		} = req.body;

		const validatedContact = await contactValidator({ cellphone, firstName, lastName });

		if (validatedContact !== true) {
			throw validatedContact;
		}

		if (user.cellphone === cellphone) {
			const error = userError.SELF_STUFF;
			throw error;
		}

		const duplicateContact = user.contacts.find((contact) => contact.cellphone === cellphone);

		if (duplicateContact !== undefined) {
			const error = userError.CELLPHONE_EXIST;
			throw error;
		}

		await user.updateOne({
			contacts: [...user.contacts, { cellphone, firstName, lastName }],
		});

		res.status(200).json({ cellphone });
	} catch (error) {
		console.log("addContactCellphoneController", error);
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { addContactCellphoneController };
