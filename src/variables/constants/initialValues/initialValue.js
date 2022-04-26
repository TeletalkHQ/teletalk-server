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

const initialValidatorPropValues = {
  type: {
    values: {
      string: "string",
      required: "required",
      minlength: "stringMin",
      maxlength: "stringMax",
    },
    key: "type",
  },
};

const initialValue = {
  modelGeneratorInitialProperties,
  errorGeneratorInitialProperties,
  initialValidatorPropValues,
};

module.exports = { initialValue };
