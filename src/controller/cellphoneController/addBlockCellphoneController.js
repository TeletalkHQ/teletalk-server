const { userError } = require("~/constant/error/userError/userError");

const addBlockCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			phoneNumber,
			countryCode,
			countryName,
		} = req.body;

		//FIXME //! Useless find! check countryCode and countryName too.
		const duplicateBlacklistItem = user.blacklist.find(
			(user) => user.phoneNumber === phoneNumber,
		);

		if (duplicateBlacklistItem !== undefined) {
			const error = userError.CELLPHONE_EXIST;
			throw error;
		}

		user.blacklist.push({ phoneNumber });

		await user.updateOne({
			blacklist: user.blacklist,
		});

		res.status(200).json({
			blockedCellphone: { phoneNumber, countryCode, countryName },
			blacklist: user.blacklist,
		});
	} catch (error) {
		console.log("addBlockCellphoneController", error);
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { addBlockCellphoneController };
