import { UNIQUE_ERROR_IDS } from "@/variables/errors/uniqueErrorIds";

type UniqueErrorIds = typeof UNIQUE_ERROR_IDS;
type Key = keyof UniqueErrorIds;

const getEnErrorMessages = () => {
  return Object.entries(UNIQUE_ERROR_IDS).reduce((prevValue, [key, value]) => {
    prevValue[key as Key] = `MESSAGE: ${value}`;
    return prevValue;
  }, {} as UniqueErrorIds);
};

const enErrorMessages = getEnErrorMessages();

export { enErrorMessages };
