require("module-alias/register");
require("@/variables/others/globalVariables");
require("@/functions/helpers/requireDotenv").requireDotenv();

let x = { a: "" };
const z = x;

x = {};

console.log(x, z);
