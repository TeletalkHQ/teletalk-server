const objectClarify = (object = { dirtyObject: {} }) => {
	const filteredObject = {};
	Object.entries(object)?.forEach(([key, value]) => {
		if (value !== undefined) {
			filteredObject[key] = value;
		}
	});

	return { cleanObject: filteredObject };
};

module.exports = { objectClarify };
