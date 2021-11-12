const { UserModel } = require("~/model/userModel/UserModel");

const userFinder = async ({ data, keyToFind }) => {
	try {
		const { cellphone } = data;

		const user = await UserModel.findOne({
			cellphone: keyToFind || cellphone,
		});

		return { user };
	} catch (error) {
		throw error;
	}
};

module.exports = { userFinder };
