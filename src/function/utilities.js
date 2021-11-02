const { nanoid } = require("nanoid");

const idMaker = () => nanoid(30);

exports.utilities = { idMaker };
