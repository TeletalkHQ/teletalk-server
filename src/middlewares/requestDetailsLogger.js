const requestDetailsLogger = (req, _, next) => {
  logger
    .blue("--------------------------------------")
    .bgBlue("Request:", logger.colors.black)
    .bgCyan(`${req.url}`, logger.colors.black)
    .blue("--------------------------------------")
    .info();

  logger
    .red(
      "---------------------------------------------------------------------------------------------------------------------"
    )
    .info();
  logger.info("request body: ", req.body);
  logger
    .red(
      "---------------------------------------------------------------------------------------------------------------------"
    )
    .info();

  next();
};

module.exports = { requestDetailsLogger };
