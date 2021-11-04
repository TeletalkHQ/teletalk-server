const { nanoid } = require("nanoid");

const randomID = () => nanoid(30);

exports.randomID = { randomID };
