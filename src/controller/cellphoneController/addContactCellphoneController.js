const { userError } = require("~/constant/error/userError/userError");
const { cellphoneFinder } = require("~/function/utility/cellphoneFinder");

//TODO Add user status into contact and user schema
const addContactCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			firstName,
			lastName,
			cellphone,
		} = req.body;

		const { cellphone: contactItem } = cellphoneFinder({
			cellphones: user.contacts,
			targetCell: cellphone,
		});

		if (contactItem !== undefined) {
			const error = userError.CELLPHONE_EXIST;
			throw error;
		}

		user.contacts.push({ ...cellphone, firstName, lastName });

		await user.updateOne({
			contacts: user.contacts,
		});

		res.status(200).json({ cellphone });
	} catch (error) {
		console.log("addContactCellphoneController", error);
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { addContactCellphoneController };
