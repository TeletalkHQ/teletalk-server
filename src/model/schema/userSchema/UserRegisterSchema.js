const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

// uniqueValidator.defaults.type = "mongoose-unique-validator";

uniqueValidator.defaults.message = "{PATH}_exist";

// const {
// 	userRegisterValidator,
// } = require("~/model/validator/userValidator/userRegisterValidator");

const UserRegisterSchema = new mongoose.Schema({
	private_id: {
		type: String,
		unique: true,
		required: [true, private_id_required],
		minlength: [30, private_id_min_length_reach],
		maxlength: [35, private_id_max_length_reach],
		trim: true,
	},
	username: {
		type: String,
		unique: true,
		minlength: [4, username_minlength_reach],
		maxlength: [12, username_maxlength_reach],
		trim: true,
		// validate: {
		// 	validator: function (value) {
		// 		return /^[a-z\s]{0,255}$/i.test(value);
		// 	},
		// 	message: "{VALUE} is not a valid string!",
		// },
	},
	first_name: {
		type: String,
		required: [true, first_name_required],
		minlength: [1, first_name_minlength_reach],
		maxlength: [18, first_name_maxlength_reach],
		trim: true,
	},
	last_name: {
		type: String,
		minlength: [1, last_name_minlength_reach],
		maxlength: [18, last_name_maxlength_reach],
		trim: true,
	},
	cellphone: {
		type: String,
		unique: true,
		required: [true, cellphone_required],
		minlength: [10, cellphone_minlength_reach],
		maxlength: [12, cellphone_maxlength_reach],
	},
	country_code: {
		type: String,
		required: [true, country_code_required],
		minlength: [2, country_code_minlength_reach],
		maxlength: [8, country_code_maxlength_reach],
	},
	country_name: {
		type: String,
		required: [true, country_name_required],
		minlength: [2, country_name_minlength_reach],
		maxlength: [32, country_name_maxlength_reach],
	},
	bio: {
		type: String,
		minlength: [1, bio_minlength_reach],
		maxlength: [255, bio_maxlength_reach],
	},
	mac_address: {
		type: String,
		unique: true,
		required: [true, mac_address_required],
		minlength: [12, mac_address_minlength_reach],
		maxlength: [16, mac_address_maxlength_reach],
		trim: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

// UserRegisterSchema.userRegisterValidator = function (body) {
// 	return userRegisterValidator.validate(body, { abortEarly: false });
// };

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
