import { UNIQUE_ERROR_IDS } from "@/variables/others/uniqueErrorIds";

const getEnErrorMessages = () => {
  return Object.entries(UNIQUE_ERROR_IDS).reduce(
    (prevValue, [key, value]) => {
      prevValue[key] = `MESSAGE: ${value}`;
      return prevValue;
    },
    {
      ...UNIQUE_ERROR_IDS,
    }
  );
};

const enErrorMessages = getEnErrorMessages();

export { enErrorMessages };
