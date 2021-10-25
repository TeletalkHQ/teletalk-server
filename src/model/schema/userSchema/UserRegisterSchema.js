const mongoose = require("mongoose");

const UserRegisterSchema = new mongoose.Schema({
	privateID: {
		type: String,
		required: [true, "private_id_is_required"],
		unique: true,
		trim: true,
	},
	username: {
		type: String,
		unique: true,
		minlength: 4,
		maxlength: 12,
		trim: true,
	},
	firstName: {
		type: String,
		required: [true, "first_name_is_required"],
		minlength: 1,
		maxlength: [18, "first_name_is_more_than_18_character"],
		trim: true,
	},
	lastName: {
		type: String,
		maxlength: [18, "last_name_is_more_than_18_character"],
		trim: true,
	},
	cellphone: {
		type: String,
		required: [true, "cellphone_is_required"],
		unique: true,
		length: 10,
	},
	countryCode: {
		type: String,
		required: [true, "country_code_is_required"],
		length: 2,
	},
	countryName: {
		type: String,
		required: [true, "country_name_is_required"],
		maxlength: 32,
	},
	bio: {
		type: String,
		maxlength: 255,
	},
	avatarURLs: {
		type: Array,
	},
	macAddress: {
		type: String,
		required: [true, "mac_address_is_required"],
		unique: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// userSchema.statics.userValidation = function (body) {
// 	return schema.validate(body, { abortEarly: false });
// };
// userSchema.pre("save", function (next) {
// 	let user = this;

// 	if (!user.isModified("password")) return next();

// 	bcrypt.hash(user.password, 10, (err, hash) => {
// 		if (err) return next(err);
// 		user.password = hash;
// 		next();
// 	});
// });

module.exports = mongoose.model("User", UserRegisterSchema, "users");
