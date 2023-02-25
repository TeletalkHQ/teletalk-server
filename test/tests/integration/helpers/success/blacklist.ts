import { userUtilities } from "@/classes/UserUtilities";

import { cellphoneSuccessTest } from "$/tests/integration/helpers/success/cellphone";

import { FIELD_TYPE } from "@/variables/others/fieldType";

const blacklistSuccessTest = ({ equalValue, testValue }) => {
  equalValue.forEach((blacklistItem) => {
    const { item: foundBlacklistItem } = userUtilities.findByCellphone(
      testValue,
      blacklistItem
    );

    expect(foundBlacklistItem).toBeInstanceOf(FIELD_TYPE.OBJECT);

    cellphoneSuccessTest({
      equalValue: blacklistItem,
      testValue: foundBlacklistItem,
    });
  });
};

export { blacklistSuccessTest };
