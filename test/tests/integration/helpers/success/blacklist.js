const { expect } = require("chai");

const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const {
  cellphoneSuccessTest,
} = require("$/tests/integration/helpers/success/cellphone");

const { FIELD_TYPE } = require("@/variables/others/fieldType");

const blacklistSuccessTest = ({ requestValue, responseValue }) => {
  requestValue.forEach((blacklistItem) => {
    const { cellphone: foundBlacklistItem } =
      userPropsUtilities.cellphoneFinder(responseValue, blacklistItem);

    expect(foundBlacklistItem).to.be.an(FIELD_TYPE.OBJECT);

    cellphoneSuccessTest({
      requestValue: blacklistItem,
      responseValue: foundBlacklistItem,
    });
  });
};

module.exports = { blacklistSuccessTest };
