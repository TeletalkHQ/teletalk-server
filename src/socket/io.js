const sio = require("socket.io");

let io = () => {};

const ioFunctions = {
	io,
	sio: (httpServer) => {
		ioFunctions.io = sio(httpServer, {
			cors: {
				origin: "*",
			},
		});
	},
};

module.exports = {
	ioFunctions,
};
