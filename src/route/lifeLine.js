//* All routers come into here =>

const { Router } = require("express");

const { userRoute } = require("~/route/userRoute/userRoute");
const { cellphoneRoute } = require("~/route/cellphoneRoute/cellphoneRoute");
const { otherRoute } = require("~/route/otherRoute/otherRoute");

const { userRouteTemplate } = require("~/template/routeTemplate/userRouteTemplate");

const { cellphoneRouteTemplate } = require("~/template/routeTemplate/cellphoneRouteTemplate");
const { otherRouteTemplate } = require("~/template/otherTemplate/otherRouteTemplate");

const lifeLine = Router();

lifeLine.get("/", (req, res) => {
	res.send("Hey! Welcome to teletalk <3");
});

lifeLine.use(userRouteTemplate.baseRoute, userRoute);

lifeLine.use(cellphoneRouteTemplate.baseRoute, cellphoneRoute);

lifeLine.use(otherRouteTemplate.baseRoute, otherRoute);

module.exports = { lifeLine };

// const test = new mongoose.Schema({
// 	bio: {
// 		type: bio.Type[0],
// 		maxlength: bio.maxlength,
// 	},
// });

// const testModel = mongoose.model("test", test, "test");

// let index = 0;

// const testFinder = async (req, res, next) => {
// 	const test = await testModel.findOne({ _id: "61993f025aa690cf74eb0534" });
// 	req.test = test;
// 	next();
// };

// lifeLine.use(testFinder);

// lifeLine.get("/test/save", async (req, res) => {
// 	const test = req.test;

// 	test.bio = `Hi im bio ${++index}`;

// 	await test.save();
// 	res.status(200).json({ test });
// });
