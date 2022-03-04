const {
  userErrorTemplate,
} = require("~/templates/errorTemplates/userErrorTemplate");

const errorUserController = (req = expressRequest, res = expressResponse) => {
  try {
    res.status(200).json(userErrorTemplate);
  } catch (error) {
    res.errorCollector({
      data: { error: { message: "Unexpected server error", statusCode: 500 } },
    });
    res.errorResponser();
  }
};

module.exports = { errorUserController };
