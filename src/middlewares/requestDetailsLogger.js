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
