require("module-alias/register");

const path = require("path");

const dotenv = require("dotenv");
const express = require("express");

const { connectDB } = require("~/config/database/connectDB");

const { userRouter } = require("~/route/user/userRoute");

// const rootDir = path.dirname(require.main.filename);

dotenv.config({ path: "./src/config/environment/main.env" });
const app = express();
connectDB();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);

// app.use("/ROUTE_NAME",#EXPORTED_ROUTER)

app.get("/", (req, res) => {
	res.send("Hey! Welcome to teletalk <3");
});

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;

const listenerCB = () => {
	console.log(`Server is running in ${MODE} mode on port ${PORT}`);
};

app.listen(PORT, listenerCB);
