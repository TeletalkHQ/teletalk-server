//! This is temporary
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

const { errorUniqueIds } = require("@/variables/others/errorUniqueIds");

const getEnErrorMessages = () => {
  const enErrorMessages = objectUtilities.objectShallowCopy(errorUniqueIds);

  for (const key in errorUniqueIds) {
    const errorUniqueId = errorUniqueIds[key];
    enErrorMessages[key] = `MESSAGE: ${errorUniqueId}`;
  }

  return enErrorMessages;
};

const enErrorMessages = getEnErrorMessages();

module.exports = { enErrorMessages };
