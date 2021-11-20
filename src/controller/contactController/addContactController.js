const { userError } = require("~/constant/error/userError/userError");
const { myConsole } = require("~/function/utility/myConsole");
const { UserModel } = require("~/model/userModel/UserModel");
const { contactValidator } = require("~/validator/userPartValidator/contactValidator");

const addContactController = async (req, res) => {
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

		const duplicateContact = user.contacts.find((contact) => contact.cellphone === cellphone);

		if (duplicateContact !== undefined) {
			const error = userError.CELLPHONE_EXIST;
			throw error;
		}

		if (user.cellphone === cellphone) {
			const error = userError.SELF_STUFF;
			throw error;
		}

		const newUser = await UserModel.findOne({ cellphone }).exec();

		newUser.contacts.push({ cellphone, firstName, lastName });
		// user.contacts.push({ cellphone, firstName, lastName });
		myConsole.yellow("before user.save").log();
		await newUser.save();
		// await user.save();
		myConsole.yellow("after user.save").log();
		// await user.updateOne({
		// contacts: [...user.contacts, { cellphone, firstName, lastName }],
		// });

		res.status(200).json({ cellphone, user });
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { addContactController };
