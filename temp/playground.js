require("module-alias/register");
require("@/variables/others/customGlobals");
require("@/functions/helpers/requireDotenv").requireDotenv();

const fn = () => {
  const arr = [1, 2, 3];

  for (const i of arr) {
    if (i === 2) return 22;
  }

  return 2;
};

console.log(fn());
