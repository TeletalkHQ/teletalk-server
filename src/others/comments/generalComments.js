//* Levels : danger, info, warning

const generalComments = {
	danger: {
		errorResponser: ` 
      //* If there is error in validators, middlewares and etc...the request is not entered to http methods and the error you maid will be sent to the client.`,
	},
	info: {},
	warnings: {},
};

module.exports = { generalComments };
