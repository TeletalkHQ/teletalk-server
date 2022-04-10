const express = require("express");

const { middleLine } = require("~/middlewares/middleLine");

const app = express();

middleLine({ app, express });

module.exports = { app };
