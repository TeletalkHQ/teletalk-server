//* No more need attention to make absolute path
//! Require before anyone!
require("module-alias/register");

require("~/other/globals");

const express = require("express");

const dotenv = require("dotenv");

const { connectDB } = require("~/config/database/connectDB");

const { middleLine } = require("~/middleware/middleLine");

const { lifeLine } = require("~/route/lifeLine");

dotenv.config({ path: "./src/config/environment/main.env" });

//? Connect to database =>
connectDB();

const app = express();

middleLine({ app, express });

//* Your statics is here =>
app.use(express.static("~/../public"));

//* All stuff for routes is in lifeLine =>
app.use(lifeLine);

const { PORT, NODE_ENV } = process.env;

const serverListenerCB = () => {
	console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
};

//* Control your error here =>

// const server =
app.listen(PORT, serverListenerCB);
