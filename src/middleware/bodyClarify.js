const bodyClarify = (body) => {
	const filteredBody = {};
	Object.entries(body).forEach(([key, value]) => {
		if (value) {
			filteredBody[key] = value;
		}
	});

	return { body: filteredBody };
};

module.exports = { bodyClarify };
