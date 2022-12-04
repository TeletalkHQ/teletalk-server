//! This is temporary
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

const { UNIQUE_ERROR_IDS } = require("@/variables/others/uniqueErrorIds");

const getEnErrorMessages = () => {
  const enErrorMessages = objectUtilities.objectShallowCopy(UNIQUE_ERROR_IDS);

  for (const key in UNIQUE_ERROR_IDS) {
    const errorUniqueId = UNIQUE_ERROR_IDS[key];
    enErrorMessages[key] = `MESSAGE: ${errorUniqueId}`;
  }

  return enErrorMessages;
};

const enErrorMessages = getEnErrorMessages();

module.exports = { enErrorMessages };
