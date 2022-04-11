const { errorThrower } = require("./utils");

const cellphoneFinder = ({ cellphones, targetCell }) => {
  let cellphoneIndex = null;

  try {
    const cellphone = cellphones.find((cellphone, index) => {
      if (
        cellphone.phoneNumber === targetCell.phoneNumber &&
        cellphone.countryCode === targetCell.countryCode &&
        cellphone.countryName === targetCell.countryName
      ) {
        cellphoneIndex = index;
        return true;
      }

      return false;
    });

    return { cellphone, cellphoneIndex };
  } catch (error) {
    errorThrower(error, error);
  }
};

module.exports = { cellphoneFinder };
