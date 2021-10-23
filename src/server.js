require("module-alias/register");

const express = require("express");
const path = require("path");

const { connectDB } = require("./config/db");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

connectDB();

// app.use("/ROUTE_NAME",#EXPORTED_ROUTER)

app.get("/", (req, res) => {
	res.send("Heil Hitler!");
});

app.listen(8080, () => {
	console.log("Server initialized");
});

const rootDir = path.dirname(require.main.filename);
console.log(rootDir);
