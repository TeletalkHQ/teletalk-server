const UserSchema = require("~/model/schema/userSchema/UserSchema");

exports.login = async (req, res) => {
	try {
		const { cellphone, country_code } = req.body;
		const user = await UserSchema.findOne({ cellphone, country_code });
		console.log(user);
		// userValidator();
		res.end();
	} catch (error) {}
};
