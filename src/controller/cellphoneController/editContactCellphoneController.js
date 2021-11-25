const { userError } = require("~/constant/error/userError/userError");
const { cellphoneFinder } = require("~/function/utility/cellphoneFinder");

const editContactCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			firstName,
			lastName,
			cellphone,
		} = req.body;

		const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder({
			cellphones: user.contacts,
			targetCell: cellphone,
		});

		if (contactItem === undefined) {
			const error = userError.CELLPHONE_NOT_EXIST;
			throw error;
		}

		user.contacts.splice(cellphoneIndex, 1, { ...contactItem, lastName, firstName });

		await user.updateOne({
			contacts: user.contacts,
		});

		res.status(200).json({ ...contactItem, lastName, firstName });
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { editContactCellphoneController };
