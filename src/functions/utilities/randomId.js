const { nanoid } = require("nanoid");

const randomId = (size = 30) => nanoid(size);

module.exports = { randomId };
