const objectInitializer = (values, props) => {
  try {
    const tempObj = {};

    props.forEach((prop, index) => {
      tempObj[prop] = values[index];
    });

    return tempObj;
  } catch (error) {
    console.log("objectInitializer catch", error);
  }
};

module.exports = { objectInitializer };
