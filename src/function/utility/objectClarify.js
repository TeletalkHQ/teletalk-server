const objectClarify = (object = {}) => {
	const filteredObject = {};
	Object.entries(object)?.forEach(([key, value]) => {
		if (value !== undefined) {
			filteredObject[key] = value;
		}
	});

	return { object: filteredObject };
};

module.exports = { objectClarify };
