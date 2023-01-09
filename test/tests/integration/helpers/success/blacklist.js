const { expect } = require("chai");

const { userUtilities } = require("@/classes/UserUtilities");

const {
  cellphoneSuccessTest,
} = require("$/tests/integration/helpers/success/cellphone");

const { FIELD_TYPE } = require("@/variables/others/fieldType");

const blacklistSuccessTest = ({ equalValue, testValue }) => {
  equalValue.forEach((blacklistItem) => {
    const { item: foundBlacklistItem } = userUtilities.findByCellphone(
      testValue,
      blacklistItem
    );

    expect(foundBlacklistItem).to.be.an(FIELD_TYPE.OBJECT);

    cellphoneSuccessTest({
      equalValue: blacklistItem,
      testValue: foundBlacklistItem,
    });
  });
};

module.exports = { blacklistSuccessTest };
