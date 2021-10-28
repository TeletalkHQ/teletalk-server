const UserRegisterSchema = require("~/model/schema/userSchema/UserRegisterSchema");

const {
	util: { idMaker },
} = require("~/function/util");

const {
	userError: { cellphone_exist },
} = require("~/constant/error/schemaError/userSchemaError");

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

	try {
		const User = new UserRegisterSchema({
			private_id,
			username,
			first_name,
			last_name,
			cellphone,
			country_code,
			country_name,
			mac_address,
		});

		await User.save();

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
