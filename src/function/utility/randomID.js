const { nanoid } = require("nanoid");

const randomID = () => nanoid(30);

module.exports = { randomID };
