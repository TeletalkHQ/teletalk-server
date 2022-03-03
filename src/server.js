//* No more need attention to make absolute path
//! Require this module before anyone!
require("module-alias/register");

require("~/variables/globalVariables");

const path = require("path");

const express = require("express");
const dotenv = require("dotenv");
const http = require("http");

//* Example of path.join usage
dotenv.config({ path: path.join(__dirname, "..", "environments", "main.env") });

const { connectDB } = require("~/variables/configs/databaseConfigs/connectDB");

const { middleLine } = require("~/middlewares/middleLine");

const { lifeLine } = require("~/routers/lifeLine");

const { ioFunctions } = require("~/socket/io");

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
