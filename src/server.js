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
// connectDB();

const server = express();

middleLine({ server, express });

//* Your statics is here =>
server.use(express.static("~/../public"));
//* All stuff for routes is in lifeLine =>

server.use(lifeLine);

//* PORT coming from heroku, so don't touch it!
const { LOCAL_PORT, PORT, NODE_ENV } = process.env;

const EXACT_PORT = PORT || LOCAL_PORT;

const serverListenerCB = () => {
	console.log(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};

//* Control your error here =>

// const server =
server.listen(EXACT_PORT, serverListenerCB);
