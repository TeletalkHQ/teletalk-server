const { userErrorTemplate } = require("~/template/errorTemplate/userErrorTemplate");
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

		console.log("contactItem", contactItem);

		if (contactItem === undefined) {
			const error = userErrorTemplate.CELLPHONE_NOT_EXIST;
			throw error;
		}

		const editedContact = {
			countryCode: contactItem.countryCode,
			countryName: contactItem.countryName,
			firstName,
			lastName,
			phoneNumber: contactItem.phoneNumber,
		};

		user.contacts.splice(cellphoneIndex, 1, editedContact);

		console.log("user.contacts", user.contacts);

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
