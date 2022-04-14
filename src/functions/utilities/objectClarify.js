const objectClarify = (dirtyObject = {}) => {
  const cleanObject = {};

  Object.entries(dirtyObject)?.forEach(([key, value]) => {
    if (value !== undefined) {
      cleanObject[key] = value;
    }
  });

  return cleanObject;
};

module.exports = { objectClarify };
