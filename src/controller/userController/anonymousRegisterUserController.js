const anonymousRegisterUserController = (req, res) => {
	res.status(200).json({ message: "anonymous!" });
};

module.exports = { anonymousRegisterUserController };
