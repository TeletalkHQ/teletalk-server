require("module-alias/register");

const path = require("path");

const dotenv = require("dotenv");
const express = require("express");

const { connectDB } = require("~/config/db");

dotenv.config({ path: "./src/config/environments.env" });
const app = express();

app.use(express.static(path.join(__dirname, "public")));

connectDB();

// app.use("/ROUTE_NAME",#EXPORTED_ROUTER)

app.get("/", (req, res) => {
	res.send("Hey! Welcome to teletalk <3");
});

app.listen(8080, () => {
	console.log("Server initialized");
});

console.log(process.env.PORT);

const rootDir = path.dirname(require.main.filename);
console.log(rootDir);
