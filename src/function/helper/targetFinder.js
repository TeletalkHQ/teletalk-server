const { PrivateChatModel } = require("~/model/chatModel/privateChatModel");
const { UserModel } = require("~/model/userModel/UserModel");

const models = { UserModel, PrivateChatModel };

const initialOptions = {
	model: "UserModel",
	findMethod: "findOne",
	findParameters: {},
};

const targetFinder = async (data = initialOptions) => {
	try {
		if (!data) {
			const error = "Yo, send data to find your target :| ";

			throw error;
		}

		const parameters = {
			...initialOptions,
			...data,
		};

		const target = await models[parameters.model][parameters.findMethod]({
			...parameters.findParameters,
		});

		return { target };
	} catch (error) {
		console.log("userFinder catch", error);
		throw error;
	}
};

module.exports = { targetFinder };
