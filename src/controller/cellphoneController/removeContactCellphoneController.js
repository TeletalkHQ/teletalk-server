const { userError } = require("~/constant/error/userError/userError");
const { cellphoneFinder } = require("~/function/utility/cellphoneFinder");

const removeContactCellphoneController = async (req, res) => {
	try {
		const {
			DB: { user },
			cellphone,
		} = req.body;

		const { cellphone: contactItem, cellphoneIndex } = cellphoneFinder({
			cellphones: user.contacts,
			targetCell: cellphone,
		});

		console.log("contactItem", contactItem);
		if (contactItem === undefined) {
			const error = userError.CELLPHONE_NOT_EXIST;
			throw error;
		}

		console.log("cellphoneIndex", cellphoneIndex);
		user.contacts.splice(cellphoneIndex, 1);

		await user.updateOne({
			contacts: user.contacts,
		});

		res.status(200).json({ contactItem });
	} catch (error) {
		res.errorCollector({ error });
		res.errorResponser();
	}
};

module.exports = { removeContactCellphoneController };
