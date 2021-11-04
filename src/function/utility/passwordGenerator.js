const generatePassword = require("generate-password");

/**
 *
 *
 * @param {*} {
 * 	length,
 * 	number,
 * 	lowercase,
 * 	uppercase,
 * 	symbol,
 * 	exclude,
 * }
 * @return {*}
 */
const passwordGenerator = ({
	length = String,
	number,
	lowercase,
	uppercase,
	symbol,
	exclude,
}) => {
	const randomPassword = generatePassword.generate({
		length: length || 5,
		numbers: number || true,
		lowercase: lowercase || false,
		uppercase: uppercase || false,
		symbols: symbol || false,
		exclude: exclude || "",
	});

	return randomPassword;
};

module.exports = { passwordGenerator };
