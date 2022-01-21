const sio = require("socket.io");

let io = () => {};

const ioFunctions = {
	io,
	sio: (httpServer) => {
		const ioInstance = sio(httpServer, {
			cors: {
				origin: "*",
			},
		});
		ioFunctions.io = ioInstance;
	},
};

module.exports = {
	ioFunctions,
};
