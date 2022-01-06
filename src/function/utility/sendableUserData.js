const sendableUserData = ({ user }) => {
	let {
		privateID,
		firstName,
		lastName,
		bio,
		contacts,
		blacklist,
		username,
		phoneNumber,
		countryCode,
		countryName,
		chats,
	} = user;

	contacts = contacts.map((contact) => {
		if (contact._id) {
			const deleteResult = delete contact._id;
			console.log(deleteResult);
		}

		const { firstName, lastName, phoneNumber, privateID } = contact;

		return { firstName, lastName, phoneNumber, privateID };
	});

	const userData = {
		privateID,
		firstName,
		lastName,
		bio,
		contacts,
		blacklist,
		username,
		phoneNumber,
		countryCode,
		countryName,
		chats,
	};

	return { userData };
};

module.exports = { sendableUserData };
