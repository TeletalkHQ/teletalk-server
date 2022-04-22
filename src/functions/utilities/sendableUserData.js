const sendableUserData = ({ user }) => {
  const {
    privateId,
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
    const { firstName, lastName, phoneNumber, privateId } = contact;

    return { firstName, lastName, phoneNumber, privateId };
  });

  const userData = {
    privateId,
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
