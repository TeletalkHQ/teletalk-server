const { userErrorTemplate } = require("~/templates/errorTemplates/userErrorTemplate");
const { cellphoneFinder } = require("~/functions/utilities/cellphoneFinder");

//TODO Add user status into contact and user schema
const addContactCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user, targetUser },
			body: { firstName, lastName, phoneNumber, countryCode, countryName },
		} = req;

		const cellphone = { phoneNumber, countryCode, countryName };

		const { cellphone: contactItem } = cellphoneFinder({
			cellphones: user.contacts,
			targetCell: cellphone,
		});

		if (contactItem !== undefined) {
			const error = userErrorTemplate.CELLPHONE_EXIST;
			throw error;
		}

		user.contacts.push({ ...cellphone, firstName, lastName, privateID: targetUser.privateID });

		await user.updateOne({
			contacts: user.contacts,
		});

		res.status(200).json({
			contact: { ...cellphone, firstName, lastName, privateID: targetUser.privateID },
		});
	} catch (error) {
		console.log("addContactCellphoneController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { addContactCellphoneController };
