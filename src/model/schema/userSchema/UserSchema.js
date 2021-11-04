const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const {
	registerUserValidator,
} = require("~/model/validator/userValidator/registerUserValidator");

const {
	schemaUserTemplate: {
		privateID,
		username,
		firstName,
		lastName,
		cellphone,
		countryCode,
		countryName,
		bio,
		// macAddress,
		createdAt,
	},
} = require("~/model/template/userTemplate/schemaUserTemplate");

// uniqueValidator.defaults.type = "mongoose-unique-validator";

uniqueValidator.defaults.message = "{PATH}_exist";

const UserSchema = new mongoose.Schema({
	privateID: {
		type: privateID.Type[0],
		unique: privateID.unique[0],
		required: privateID.required,
		minlength: privateID.minlength,
		maxlength: privateID.maxlength,
		trim: privateID.trim[0],
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
	firstName: {
		type: firstName.Type[0],
		required: firstName.required,
		minlength: firstName.minlength,
		maxlength: firstName.maxlength,
	},
	lastName: {
		type: lastName.Type[0],
		// minlength: lastName.minlength,
		maxlength: lastName.maxlength,
		trim: lastName.trim[0],
	},
	cellphone: {
		type: cellphone.Type[0],
		unique: cellphone.unique[0],
		required: cellphone.required,
		minlength: cellphone.minlength,
		maxlength: cellphone.maxlength,
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
	bio: {
		type: bio.Type[0],
		// minlength: bio.minlength,
		maxlength: bio.maxlength,
	},
	// macAddress: {
	// 	type: macAddress.Type[0],
	// 	unique: macAddress.unique[0],
	// 	required: macAddress.required,
	// 	minlength: macAddress.minlength,
	// 	maxlength: macAddress.maxlength,
	// 	trim: macAddress.trim[0],
	// },
	createdAt: {
		type: createdAt.Type[0],
		default: createdAt.default[0],
	},
});

UserSchema.statics.userRegisterValidator = async function (data) {
	return registerUserValidator(data);
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

UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.model("User", UserSchema, "users");

module.exports = { User: UserModel };
