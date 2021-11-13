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

// app.use(cors());
// let captchaCode = null;
// app.get("/getCaptchaCode", (req, res) => {
// 	const pass = passwordGenerator({ length: 3 });
// 	captchaCode = pass;
// 	res.status(200).json({ answer: pass });
// });

// app.post("/sendCaptchaCode", (req, res) => {
// 	const answer = req.params.captchaInput;
// 	let mobileNumber = req.params.mobileNumber;
// 	mobileNumber = mobileNumber || "mobile number is incorrect";

// 	if (answer === captchaCode) {
// 		res
// 			.status(200)
// 			.json({ answer: "answer is true", answerCode: answer, mobileNumber });
// 	} else {
// 		res.status(200).json({ answer: "answer is false", mobileNumber });
// 	}
// });
