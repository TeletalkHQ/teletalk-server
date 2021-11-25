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
		type: bio.Type.value,
		maxlength: [bio.maxlength.value, bio.maxlength.error.message],
	},
	blacklist: {
		type: blacklist.Type.value,
		default: blacklist.default.value,
	},
	contacts: {
		type: contacts.Type.value,
		default: contacts.default.value,
	},
	countryCode: {
		type: countryCode.Type.value,
		required: [countryCode.required.value, countryCode.required.error.message],
		minlength: [countryCode.minlength.value, countryCode.minlength.error.message],
		maxlength: [countryCode.maxlength.value, countryCode.maxlength.error.message],
	},
	countryName: {
		type: countryName.Type.value,
		required: [countryName.required.value, countryName.required.error.message],
		minlength: [countryName.minlength.value, countryName.minlength.error.message],
		maxlength: [countryName.maxlength.value, countryName.maxlength.error.message],
	},
	createdAt: {
		type: createdAt.Type.value,
		default: createdAt.default.value,
	},
	firstName: {
		type: firstName.Type.value,
		required: [firstName.required.value, firstName.required.error.message],
		minlength: [firstName.minlength.value, firstName.minlength.error.message],
		maxlength: [firstName.maxlength.value, firstName.maxlength.error.message],
	},
	lastName: {
		type: lastName.Type.value,
		maxlength: [lastName.maxlength.value, lastName.maxlength.error.message],
		trim: lastName.trim.value,
		defaults: lastName.default.value,
	},
	// macAddress: {
	// 	type: macAddress.Type.value,
	// 	unique: macAddress.unique.value,
	// 	required: macAddress.required,
	// 	minlength: macAddress.minlength,
	// 	maxlength: macAddress.maxlength,
	// 	trim: macAddress.trim.value,
	// },
	phoneNumber: {
		type: phoneNumber.Type.value,
		unique: phoneNumber.unique.value,
		required: [phoneNumber.required.value, phoneNumber.required.error.message],
		minlength: [phoneNumber.minlength.value, phoneNumber.minlength.error.message],
		maxlength: [phoneNumber.maxlength.value, phoneNumber.maxlength.error.message],
	},
	privateID: {
		type: privateID.Type.value,
		unique: privateID.unique.value,
		required: [privateID.required.value, privateID.required.error.message],
		minlength: [privateID.minlength.value, privateID.minlength.error.message],
		maxlength: [privateID.maxlength.value, privateID.maxlength.error.message],
		trim: privateID.trim.value,
	},
	tokens: {
		type: tokens.Type.value,
		// unique: tokens.unique.value,
		required: [tokens.required.value, tokens.required.error.message],
	},
	username: {
		type: username.Type.value,
		maxlength: [username.maxlength.value, username.maxlength.error.message],
		trim: username.trim.value,
		lowercase: username.lowercase.value,
		default: username.default.value,
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
