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
