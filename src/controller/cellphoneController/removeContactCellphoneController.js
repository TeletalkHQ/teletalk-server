const removeContactCellphoneController = (req, res) => {
	try {
		const {
			DB: { user },
			cellphone,
		} = req.body;
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { removeContactCellphoneController };
