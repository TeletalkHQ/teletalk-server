const { userErrorTemplate } = require("~/templates/errorTemplates/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");

const removeContactCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			body: { phoneNumber, countryCode, countryName },
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

		user.contacts.splice(cellphoneIndex, 1);

		await user.updateOne({
			contacts: user.contacts,
		});

		res.status(200).json({ removedContact: contactItem });
	} catch (error) {
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { removeContactCellphoneController };
