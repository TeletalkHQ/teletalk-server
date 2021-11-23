const removeContactCellphoneController = (req, res) => {
	try {
		const {
			DB: { user },
			cellphone,
			firstName,
			lastName,
		} = req.body;
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { removeContactCellphoneController };
