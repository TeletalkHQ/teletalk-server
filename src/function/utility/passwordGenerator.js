const generatePassword = require("generate-password");

const passwords = { pass: 0 };

const initialOptions = {
	length: 6,
	numbers: true,
	lowercase: false,
	uppercase: false,
	symbol: false,
	exclude: "",
};

const passwordGenerator = (options = initialOptions) => {
	try {
		const randomPassword = generatePassword.generate({
			...initialOptions,
			...options,
		});

		return { randomPassword };
	} catch (err) {
		throw err;
	}
};

module.exports = { passwordGenerator, passwords };
