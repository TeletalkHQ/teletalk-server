const { nanoid } = require("nanoid");

const randomID = (size = 30) => nanoid(size);

module.exports = { randomID };
