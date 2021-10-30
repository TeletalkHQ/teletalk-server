require("module-alias/register");

const path = require("path");

const dotenv = require("dotenv");
const morgan = require("morgan");
const express = require("express");
const pe = require("pretty-error");

const { connectDB } = require("~/config/database/connectDB");

dotenv.config({ path: "./src/config/environment/main.env" });

pe.start();
const app = express();

const { lifeline } = require("~/route/lifeline");

connectDB();

app.use(express.json());

app.use(lifeline);

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Hey! Welcome to teletalk <3");
});

const { PORT, NODE_ENV: MODE } = process.env;

const listenerCB = () => {
	console.log(`Server is running in ${MODE} mode on port ${PORT}`);
};

app.listen(PORT, listenerCB);

// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header(
// 		"Access-Control-Allow-Methods",
// 		"GET,HEAD,OPTIONS,POST,PUT,DELETE"
// 	);
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
// 	);
// 	next();
// });
// app.use((req, res, next) => {
// 	var err = new Error("Not Found");
// 	err.status = 404;
// 	next(err);
// });

// app.use((err, req, res, next) => {
// 	const error = {
// 		error: err,
// 		code: err.status,
// 		success: false,
// 	};

// 	res.json(error);
// });

// app.use("/ROUTE_NAME",#EXPORTED_ROUTER)
// const rootDir = path.dirname(require.main.filename);
