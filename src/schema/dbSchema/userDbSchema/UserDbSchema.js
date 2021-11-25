const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const { contactValidator } = require("~/validator/userValidator/contactValidator");

const {
	userSchemaTemplate: {
		bio,
		blacklist,
		phoneNumber,
		contacts,
		countryCode,
		countryName,
		createdAt,
		firstName,
		lastName,
		privateID,
		tokens,
		username,
	},
} = require("~/template/schemaTemplate/userSchemaTemplate");

uniqueValidator.defaults.message = "{PATH}_exist";
// uniqueValidator.defaults.type = "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
	bio: {
		type: bio.Type[0],
		maxlength: bio.maxlength,
	},
	blacklist: {
		type: blacklist.Type[0],
		default: blacklist.default[0],
	},
	phoneNumber: {
		type: phoneNumber.Type[0],
		unique: phoneNumber.unique[0],
		required: phoneNumber.required,
		minlength: phoneNumber.minlength,
		maxlength: phoneNumber.maxlength,
	},
	contacts: {
		type: contacts.Type[0],
		default: contacts.default[0],
	},
	countryCode: {
		type: countryCode.Type[0],
		required: countryCode.required,
		minlength: countryCode.minlength,
		maxlength: countryCode.maxlength,
	},
	countryName: {
		type: countryName.Type[0],
		required: countryName.required,
		minlength: countryName.minlength,
		maxlength: countryName.maxlength,
	},
	createdAt: {
		type: createdAt.Type[0],
		default: createdAt.default[0],
	},
	firstName: {
		type: firstName.Type[0],
		required: firstName.required,
		minlength: firstName.minlength,
		maxlength: firstName.maxlength,
	},
	lastName: {
		type: lastName.Type[0],
		maxlength: lastName.maxlength,
		trim: lastName.trim[0],
		defaults: lastName.default[0],
	},
	// macAddress: {
	// 	type: macAddress.Type[0],
	// 	unique: macAddress.unique[0],
	// 	required: macAddress.required,
	// 	minlength: macAddress.minlength,
	// 	maxlength: macAddress.maxlength,
	// 	trim: macAddress.trim[0],
	// },
	privateID: {
		type: privateID.Type[0],
		unique: privateID.unique[0],
		required: privateID.required,
		minlength: privateID.minlength,
		maxlength: privateID.maxlength,
		trim: privateID.trim[0],
	},
	tokens: {
		type: tokens.Type[0],
		unique: tokens.unique[0],
		required: tokens.required,
	},
	username: {
		type: username.Type[0],
		maxlength: username.maxlength,
		trim: username.trim[0],
		lowercase: username.lowercase[0],
		default: username.default[0],
		// validate: {
		// 	validator: function (value) {
		// 		return /^[a-z\s]{0,255}$/i.test(value);
		// 	},
		// 	message: "{VALUE} is not a valid string!",
		// },
	},
});

UserSchema.statics.userRegisterValidator = async function (data) {
	return contactValidator(data);
};

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

UserSchema.plugin(uniqueValidator);

module.exports = { UserSchema };
