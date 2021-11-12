const generatePassword = require("generate-password");

const passwords = { pass: 0 };

const passwordGenerator = ({
	length = 6,
	number = true,
	lowercase = false,
	uppercase = false,
	symbol = false,
	exclude = "",
}) => {
	try {
		console.log("passwordGenerator");
		const randomPassword = generatePassword.generate({
			length,
			number,
			lowercase,
			uppercase,
			symbol,
			exclude,
		});

		return { randomPassword };
	} catch (err) {
		throw err;
	}
};

module.exports = { passwordGenerator, passwords };
