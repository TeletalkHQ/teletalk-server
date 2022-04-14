const errorGeneratorInitialProperties = {
  code: 0,
  message: "",
  reason: "",
  version: "",
};

const modelGeneratorInitialProperties = {
  value: null,
  error: errorGeneratorInitialProperties,
};

const initialValue = {
  modelGeneratorInitialProperties,
  errorGeneratorInitialProperties,
};

module.exports = { initialValue };
