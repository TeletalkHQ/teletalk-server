const {
  isDataHasEqualityWithTargetCellphone,
} = require("@/functions/utilities/utils");

class DataUsageManager {
  constructor() {
    this.usedCellphone = [];
  }

  addUsedCellphone(cellphone) {
    this.usedCellphone.push(cellphone);

    return this;
  }

  isCellphoneUsedBefore(cellphone) {
    return this.usedCellphone.some((c) =>
      isDataHasEqualityWithTargetCellphone(c, cellphone)
    );
  }
}

const dataUsageManager = new DataUsageManager();

module.exports = { DataUsageManager, dataUsageManager };
