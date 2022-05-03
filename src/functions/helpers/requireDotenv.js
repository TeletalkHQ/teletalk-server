const path = require("path");

const requireDotenv = () => {
  require("dotenv").config({
    path: path.join(
      __dirname,
      "..",
      "..",
      "..",
      "environments",
      `${process.env.NODE_ENV}.env`
    ),
  });
};

module.exports = { requireDotenv };
