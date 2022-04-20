const errorThrower = (condition, error) => {
  if (condition) throw error;
};

const objectInitializer = (values, props) => {
  try {
    const tempObj = {};

    props.forEach((prop, index) => {
      tempObj[prop] = values[index];
    });

    return tempObj;
  } catch (error) {
    logger.log("objectInitializer catch", error);
  }
};

module.exports = { errorThrower, objectInitializer };
