const requestDetailsLogger = (req, _, next) => {
  logger
    .blue("--------------------------------------")
    .bgBlue({
      text: "Request arrived: ",
      textColor: logger.colors.black,
    })
    .bgCyan({
      text: `${req.url}`,
      textColor: logger.colors.black,
    })
    .blue("--------------------------------------")
    .log();

  logger
    .red(
      "---------------------------------------------------------------------------------------------------------------------"
    )
    .log();
  logger.log("request body: ", req.body);
  logger
    .red(
      "---------------------------------------------------------------------------------------------------------------------"
    )
    .log();

  next();
};

module.exports = { requestDetailsLogger };
