const cellphoneFinder = ({ cellphones, targetCell }) => {
	try {
		const cellphone = cellphones.find((cellphone) => {
			if (
				cellphone.phoneNumber === targetCell.phoneNumber &&
				cellphone.countryCode === targetCell.countryCode &&
				cellphone.countryName === targetCell.countryName
			) {
				return true;
			}
			return false;
		});

		return cellphone;
	} catch (error) {
		throw error;
	}
};

module.exports = { cellphoneFinder };
