const UserRegisterSchema = require("~/model/schema/userSchema/UserRegisterSchema");

const {
	util: { idMaker },
} = require("~/function/util");
const {
	userRegisterValidator,
} = require("~/model/validator/userValidator/userRegisterValidator");

exports.register = async (req, res) => {
	const private_id = idMaker();

	const {
		username,
		first_name,
		last_name,
		cellphone,
		country_code,
		country_name,
		mac_address,
	} = req.body;

	console.log(req.body);

	req.body.private_id = private_id;

	try {
		// await UserRegisterSchema.userRegisterValidator(req.body);
		const validatedDataResult = userRegisterValidator(req.body);

		if (validatedDataResult !== true) {
			res.status(400).json(validatedDataResult);
			return;
		}

		// const User = new UserRegisterSchema({
		// 	private_id,
		// 	username,
		// 	first_name,
		// 	last_name,
		// 	cellphone,
		// 	country_code,
		// 	country_name,
		// 	mac_address,
		// });

		// await User.save();

		res.status(200).json({
			private_id,
			username,
			first_name,
			last_name,
			cellphone,
			country_code,
			country_name,
			mac_address,
		});
	} catch (err) {
		res.status(400).json(err);
	}
};
