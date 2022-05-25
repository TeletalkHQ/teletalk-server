require("module-alias/register");

const fn = (baseUrl, routes) =>
  Object.values(routes).map((value) => `${baseUrl.url}${value.url}`);
