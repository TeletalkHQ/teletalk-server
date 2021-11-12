//* Levels : danger, info, warning

const comment = {
	danger: {
		errorResponser: `
      //! Call errorResponser before http methods. 
      //* If there is error in validators, middlewares and ...the request is not entered to http methods and the error will be sent to the client.`,
	},
	info: {},
	warnings: {},
};

module.exports = { comment };
