const welcomeOtherController = (req, res) => {
	try {
		res.status(200).json({ welcome: "Hey! Welcome to teletalk <3" });
	} catch (error) {
		console.log("welcome route catch", error);
		res.errorCollector({ data: { error } });
		res.errorResponser();
	}
};

module.exports = { welcomeOtherController };
