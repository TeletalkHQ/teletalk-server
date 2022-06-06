require("module-alias/register");
require("@/functions/helpers/requireDotenv").requireDotenv();
require("@/variables/globalVariables");

const { customTypeof } = require("@/functions/utilities/utils");

const objectClarify = (dirtyObject = {}) => {
  const cleanObject = {};

  Object.entries(dirtyObject)?.forEach(([key, value]) => {
    if (!customTypeof(value).type.undefined) {
      if (customTypeof(dirtyObject[key]).type.object) {
        cleanObject[key] = objectClarify(dirtyObject[key]);

        return;
      }

      cleanObject[key] = value;
    }
  });

  return cleanObject;
};

logger.log(
  objectClarify({ a: "", b: "", c: undefined, d: { e: "", f: undefined } })
);
