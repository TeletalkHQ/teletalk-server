const sendableUserData = ({ user }) => {
	const {
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

	const sendingContacts = contacts.map((contact) => {
		const { firstName, lastName, phoneNumber, privateID } = contact;

		return { firstName, lastName, phoneNumber, privateID };
	});

	const userData = {
		privateID,
		firstName,
		lastName,
		bio,
		contacts: sendingContacts,
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
