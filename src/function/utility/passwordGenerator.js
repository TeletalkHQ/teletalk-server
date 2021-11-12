const generatePassword = require("generate-password");

const passwords = { pass: 0 };

const passwordGenerator = ({
	length = 5,
	number = true,
	lowercase = false,
	uppercase = false,
	symbol = false,
	exclude = "",
}) => {
	const randomPassword = generatePassword.generate({
		length,
		number,
		lowercase,
		uppercase,
		symbol,
		exclude,
	});

	return randomPassword;
};

module.exports = { passwordGenerator, passwords };
