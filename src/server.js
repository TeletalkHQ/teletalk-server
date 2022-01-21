//* No more need attention to make absolute path
//! Require before anyone!
require("module-alias/register");

require("~/other/globals");

const express = require("express");
const dotenv = require("dotenv");
const http = require("http");

dotenv.config({ path: "./src/config/environment/main.env" });

const { connectDB } = require("~/config/database/connectDB");

const { middleLine } = require("~/middleware/middleLine");

const { lifeLine } = require("~/route/lifeLine");
const { ioFunctions } = require("./socket/io");

//? Connect to database =>
connectDB();

const expressServer = express();

const httpServer = http.createServer(expressServer);

ioFunctions.sio(httpServer);

middleLine({ server: expressServer, express });

//* Your statics is here =>
expressServer.use(express.static("~/../public"));
//* All stuff for routes is in lifeLine =>

expressServer.use(lifeLine);

//* PORT coming from heroku, so don't touch it!
const { LOCAL_PORT, PORT, NODE_ENV } = process.env;

const EXACT_PORT = PORT || LOCAL_PORT;

const serverListenerCB = () => {
	console.log(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};

ioFunctions.io.on("connection", (socket) => {
	console.log("User connected.");

	console.log(socket.id);

	socket.on("disconnect", (...params) => {
		console.log(`${socket.id} disconnected`);

		console.log(params);
	});
});

httpServer.listen(EXACT_PORT, serverListenerCB);
