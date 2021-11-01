const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const {
	userRegisterValidator,
} = require("~/model/validator/userValidator/userRegisterValidator");

const {
	userSchemaTemplate: {
		private_id,
		username,
		first_name,
		last_name,
		cellphone,
		country_code,
		country_name,
		bio,
		// mac_address,
		created_at,
	},
} = require("~/model/template/userTemplate/userSchemaTemplate");

// uniqueValidator.defaults.type = "mongoose-unique-validator";

uniqueValidator.defaults.message = "{PATH}_exist";

const UserRegisterSchema = new mongoose.Schema({
	private_id: {
		type: private_id.Type[0],
		unique: private_id.unique[0],
		required: private_id.required,
		minlength: private_id.minlength,
		maxlength: private_id.maxlength,
		trim: private_id.trim[0],
	},
	username: {
		type: username.Type[0],
		unique: username.unique[0],
		// minlength: username.minlength,
		maxlength: username.maxlength,
		trim: username.trim[0],
		lowercase: username.lowercase[0],
		// validate: {
		// 	validator: function (value) {
		// 		return /^[a-z\s]{0,255}$/i.test(value);
		// 	},
		// 	message: "{VALUE} is not a valid string!",
		// },
	},
	first_name: {
		type: first_name.Type[0],
		required: first_name.required,
		minlength: first_name.minlength,
		maxlength: first_name.maxlength,
	},
	last_name: {
		type: last_name.Type[0],
		// minlength: last_name.minlength,
		maxlength: last_name.maxlength,
		trim: last_name.trim[0],
	},
	cellphone: {
		type: cellphone.Type[0],
		unique: cellphone.unique[0],
		required: cellphone.required,
		minlength: cellphone.minlength,
		maxlength: cellphone.maxlength,
	},
	country_code: {
		type: country_code.Type[0],
		required: country_code.required,
		minlength: country_code.minlength,
		maxlength: country_code.maxlength,
	},
	country_name: {
		type: country_name.Type[0],
		required: country_name.required,
		minlength: country_name.minlength,
		maxlength: country_name.maxlength,
	},
	bio: {
		type: bio.Type[0],
		// minlength: bio.minlength,
		maxlength: bio.maxlength,
	},
	// mac_address: {
	// 	type: mac_address.Type[0],
	// 	unique: mac_address.unique[0],
	// 	required: mac_address.required,
	// 	minlength: mac_address.minlength,
	// 	maxlength: mac_address.maxlength,
	// 	trim: mac_address.trim[0],
	// },
	created_at: {
		type: created_at.Type[0],
		default: created_at.default[0],
	},
});

UserRegisterSchema.statics.userRegisterValidator = async function (data) {
	return userRegisterValidator(data);
};

//* bcrypt
// UserRegisterSchema.pre("save", function (next) {
// let user = this;

// if (!user.isModified("password")) return next();

// bcrypt.hash(user.password, 10, (err, hash) => {
// 	if (err) return next(err);
// 	user.password = hash;
// 	next();
// });
// });

// UserRegisterSchema.post("save", function (error, doc, next) {
// 	const keys = {};
// 	Object.keys(error).forEach((key) => (keys[key] = error[key]));
// 	console.log(keys, "171474147414741474114741147414741474");
// 	if (error.code === 11000) {
// 		next(new Error(error));
// 	} else {
// 		next(error);
// 	}
// });
//

UserRegisterSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserRegisterSchema, "users");
