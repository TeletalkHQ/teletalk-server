const logoutNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    res.status(200).json({ ok: true });
  } catch (error) {
    logger.log("logoutNormalUserController", error);
    res.errorCollector(error);
    res.errorResponser();
  }
};

module.exports = { logoutNormalUserController };
