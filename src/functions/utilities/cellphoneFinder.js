const {
  errorThrower,
  isEqualWithTargetCellphone,
} = require("~/functions/utilities/utils");

const cellphoneFinder = (cellphones, targetCellphone) => {
  let cellphoneIndex = -1;

  try {
    const cellphone = cellphones.find((cellphone, index) => {
      cellphoneIndex = index;
      return isEqualWithTargetCellphone(cellphone, targetCellphone);
    });
    return { cellphone, cellphoneIndex };
  } catch (error) {
    errorThrower(error, error);
  }
};

module.exports = { cellphoneFinder };
