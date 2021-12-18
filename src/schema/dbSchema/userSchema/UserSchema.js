const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { chatSchemaTemplate } = require("~/template/schemaTemplate/chatSchemaTemplate");

const {
	userSchemaTemplate: {
		bio,
		// blacklist,
		// contacts,
		countryCode,
		countryName,
		createdAt,
		firstName,
		lastName,
		phoneNumber,
		privateID,
		token,
		username,
	},
} = require("~/template/schemaTemplate/userSchemaTemplate");

const { chatID } = chatSchemaTemplate;

uniqueValidator.defaults.message = "{PATH}_exist";

const user = {
	bio: {
		maxlength: [bio.maxlength.value, bio.maxlength.error.message],
		type: bio.type.value,
	},
	chatID: {
		maxlength: [chatID.maxlength.value, chatID.maxlength.error.message],
		minlength: [chatID.minlength.value, chatID.minlength.error.message],
		required: [chatID.required.value, chatID.required.error.message],
		trim: chatID.trim.value,
		type: chatID.type.value,
		// unique: chatID.unique.value,
	},
	countryCode: {
		maxlength: [countryCode.maxlength.value, countryCode.maxlength.error.message],
		minlength: [countryCode.minlength.value, countryCode.minlength.error.message],
		required: [countryCode.required.value, countryCode.required.error.message],
		type: countryCode.type.value,
	},
	countryName: {
		maxlength: [countryName.maxlength.value, countryName.maxlength.error.message],
		minlength: [countryName.minlength.value, countryName.minlength.error.message],
		required: [countryName.required.value, countryName.required.error.message],
		type: countryName.type.value,
	},
	createdAt: {
		default: createdAt.default.value,
		type: createdAt.type.value,
	},
	firstName: {
		maxlength: [firstName.maxlength.value, firstName.maxlength.error.message],
		minlength: [firstName.minlength.value, firstName.minlength.error.message],
		required: [firstName.required.value, firstName.required.error.message],
		type: firstName.type.value,
	},
	lastName: {
		defaults: lastName.default.value,
		maxlength: [lastName.maxlength.value, lastName.maxlength.error.message],
		trim: lastName.trim.value,
		type: lastName.type.value,
	},
	// macAddress: {
	// 	type: macAddress.type.value,
	// 	unique: macAddress.unique.value,
	// 	required: macAddress.required,
	// 	minlength: macAddress.minlength,
	// 	maxlength: macAddress.maxlength,
	// 	trim: macAddress.trim.value,
	// },
	phoneNumber: {
		maxlength: [phoneNumber.maxlength.value, phoneNumber.maxlength.error.message], // default: "",
		minlength: [phoneNumber.minlength.value, phoneNumber.minlength.error.message],
		required: [phoneNumber.required.value, phoneNumber.required.error.message],
		type: phoneNumber.type.value,
		// unique: phoneNumber.unique.value,
	},
	privateID: {
		maxlength: [privateID.maxlength.value, privateID.maxlength.error.message],
		minlength: [privateID.minlength.value, privateID.minlength.error.message],
		required: [privateID.required.value, privateID.required.error.message],
		trim: privateID.trim.value,
		type: privateID.type.value,
		unique: privateID.unique.value,
	},
	token: {
		required: [token.required.value, token.required.error.message],
		type: token.type.value,
		unique: token.unique.value,
	},
	username: {
		default: username.default.value, // validate: {
		// 	validator: function (value) {
		// 		return /^[a-z\s]{0,255}$/i.test(value);
		// 	},
		// 	message: "{VALUE} is not a valid string!",
		// },
		lowercase: username.lowercase.value,
		maxlength: [username.maxlength.value, username.maxlength.error.message],
		trim: username.trim.value,
		type: username.type.value,
	},
};

// uniqueValidator.defaults.type = "mongoose-unique-validator";
//TODO Add type check =>
const UserSchema = new mongoose.Schema({
	bio: {
		maxlength: [bio.maxlength.value, bio.maxlength.error.message],
		type: bio.type.value,
	},

	blacklist: [
		{
			countryCode: user.countryCode,
			countryName: user.countryName,
			phoneNumber: user.phoneNumber,
		},
	],

	chats: [{ chatID: user.chatID }],

	contacts: [
		{
			countryCode: user.countryCode,
			countryName: user.countryName,
			firstName: user.firstName,
			lastName: user.lastName,
			phoneNumber: user.phoneNumber,
		},
	],

	countryCode: user.countryCode,

	countryName: user.countryName,

	createdAt: user.createdAt,

	firstName: user.firstName,

	lastName: user.lastName,

	phoneNumber: user.phoneNumber,

	privateID: user.privateID,

	tokens: [
		{
			token: user.token,
		},
	],

	username: user.username, //TODO UserStatus here =>
});

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
