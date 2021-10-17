require("module-alias/register");
// const test = require("./Scripts/Functions/temp");

const express = require("express");
const test = require("~/temp");
const app = express();

app.listen(3000, () => {
	console.log("Server initialized");
});

test();
