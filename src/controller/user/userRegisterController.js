const UserRegisterSchema = require("~/model/schema/userSchema/UserRegisterSchema");

const {
	util: { idMaker },
} = require("~/function/util");

exports.register = async (req, res) => {
	const errors = [];
	console.log(req.body);
	const {
		firstName,
		lastName,
		cellphone,
		avatarURLs,
		countryName,
		macAddress,
		countryCode,
	} = req.body;

	try {
		const user = await UserRegisterSchema.findOne({ cellphone });
		if (user) {
			errors.push({ message: "cellphone_exist" });
			return res.status(400).json({
				errors,
			});
		}

		try {
			await UserRegisterSchema.validate({
				// privateID: idMaker(),
				firstName,
				lastName,
				cellphone,
				countryName,
				countryCode,
				avatarURLs,
				macAddress,
			});
		} catch (err) {
			console.log(err);
			res.status(400).json({ errors: { err } });
		}

		// console.warn("error", error);
		// errors.push(error);

		// if (!error) {
		// 	const userResponse = await UserRegisterSchema.create({
		// 		privateID: idMaker(),
		// 		firstName,
		// 		lastName,
		// 		cellphone,
		// 		countryName,
		// 		countryCode,
		// 		avatarURLs,
		// 		macAddress,
		// 	});

		// }
		// res.status(200).json({ userResponse });
	} catch (err) {
		console.log(err);
		err?.inner?.forEach((e) => {
			errors.push({
				name: e.path,
				message: e.message,
			});
		});

		res.status(400).json({ errors });
	}

	// res.end();
};
