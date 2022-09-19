const path = require("path");

const cwd = process.cwd();

const requireDotenv = () => {
  require("dotenv").config({
    path: path.join(cwd, "environments", `${process.env.NODE_ENV}.env`),
  });
};

module.exports = { requireDotenv };
