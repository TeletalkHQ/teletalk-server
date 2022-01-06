const { sendableUserData } = require("~/function/utility/sendableUserData");

const getContactsCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
		} = req;
		console.log("getContactsCellphoneController");

		const { userData } = sendableUserData({ user });

		res.status(200).json({ contacts: userData.contacts });
	} catch (error) {
		console.log("getContactsCellphoneController", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { getContactsCellphoneController };
