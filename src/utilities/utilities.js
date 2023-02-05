const { customTypeof } = require("custom-typeof");
const { errorThrower } = require("utility-store/src/utilities/utilities");

const getHostFromRequest = (request) => request.get("host");

const isUrlMatchWithReqUrl = (url, reqUrl) =>
  (customTypeof.isArray(url) && url.some((u) => u === reqUrl)) ||
  url === reqUrl;

const crashServer = (message) => {
  logger.error(message);
  process.exit(1);
};

const executeMiddlewares = async ({ middlewares, next, req, res }) => {
  for await (const m of middlewares) {
    const result = await m(req, res, () => {});

    if (result.ok === false) {
      return;
    }
  }

  return next();
};

const checkIgnoreApplyMiddlewaresRequirements = (url, middlewares) => {
  errorThrower(
    customTypeof.isNotString(url) && customTypeof.isNotArray(url),
    "url must be string or an array"
  );

  errorThrower(!middlewares.length, "You need to pass at least one middleware");
};

const regexMaker = (pattern) => new RegExp(pattern);

const logEnvironments = () => console.log(sortEnvironments());

const sortEnvironments = () =>
  Object.entries(process.env)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => a.key.localeCompare(b.key))
    .reduce((prevValue, currentValue) => {
      prevValue[currentValue.key] = currentValue.value;
      return prevValue;
    }, {});

module.exports = {
  checkIgnoreApplyMiddlewaresRequirements,
  crashServer,
  executeMiddlewares,
  getHostFromRequest,
  isUrlMatchWithReqUrl,
  logEnvironments,
  regexMaker,
  sortEnvironments,
};
