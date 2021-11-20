const { UserModel } = require("~/model/userModel/UserModel");

const userFinder = async (data) => {
	try {
		const user = await UserModel.findOne({
			...data,
		}).exec();

		return { user };
	} catch (error) {
		throw error;
	}
};

module.exports = { userFinder };
