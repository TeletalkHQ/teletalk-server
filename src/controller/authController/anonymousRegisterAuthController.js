const anonymousRegisterAuthController = (req, res) => {
	res.status(200).json({ message: "anonymous!" });
};

module.exports = { anonymousRegisterAuthController };
