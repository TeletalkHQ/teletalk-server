//* No more need attention to make absolute path
//! Require before anyone!
require("module-alias/register");

require("~/other/globals");

const express = require("express");

const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/environment/main.env" });

const { connectDB } = require("~/config/database/connectDB");

const { middleLine } = require("~/middleware/middleLine");

const { lifeLine } = require("~/route/lifeLine");

//? Connect to database =>
connectDB();

const app = express();

middleLine({ app, express });

//* Your statics is here =>
app.use(express.static("~/../public"));

//* All stuff for routes is in lifeLine =>
app.use(lifeLine);

const { LOCAL_PORT, PORT, NODE_ENV } = process.env;

const EXACT_PORT = PORT || LOCAL_PORT || 8080;

const serverListenerCB = () => {
	console.log(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};

//* Control your error here =>

// const server =
app.listen(EXACT_PORT, serverListenerCB);
