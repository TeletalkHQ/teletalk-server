const { isEqualWithTargetCellphone } = require("@/functions/utilities/utils");

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
      isEqualWithTargetCellphone(c, cellphone)
    );
  }
}

const dataUsageManager = new DataUsageManager();

module.exports = { DataUsageManager, dataUsageManager };
