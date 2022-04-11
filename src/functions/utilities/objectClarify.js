const objectClarify = (obj = { dirtyObject: {} }) => {
  const filteredObject = {};

  Object.entries(obj.dirtyObject)?.forEach(([key, value]) => {
    if (value !== undefined) {
      filteredObject[key] = value;
    }
  });

  return { cleanObject: filteredObject };
};

module.exports = { objectClarify };
