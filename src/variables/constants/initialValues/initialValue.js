const initialSchemaPropertyKey = {
  value: null,
  error: {
    code: 0,
    message: "",
    reason: "",
    version: "",
  },
};

const jwtOptions = { algorithm: "HS256" };

const initialValue = { initialSchemaPropertyKey, jwtOptions };

module.exports = { initialValue };
