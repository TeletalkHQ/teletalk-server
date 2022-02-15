const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");
const { cellphoneFinder } = require("~/function/utility/cellphoneFinder");

const editContactCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			body: { firstName, lastName, phoneNumber, countryCode, countryName },
		} = req;

		const cellphone = { phoneNumber, countryCode, countryName };

		const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder({
			cellphones: user.contacts,
			targetCell: cellphone,
		});

		if (contactItem === undefined) {
			const error = userErrorTemplate.CELLPHONE_NOT_EXIST;
			throw error;
		}

		const editedContact = { ...cellphone, firstName, lastName };

		user.contacts.splice(cellphoneIndex, 1, editedContact);

		await user.updateOne({
			contacts: user.contacts,
		});

		res.status(200).json({ ...contactItem, lastName, firstName });
	} catch (error) {
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { editContactCellphoneController };
