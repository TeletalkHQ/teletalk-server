import mongooseUniqueValidator from "mongoose-unique-validator";

mongooseUniqueValidator.defaults.message = "{PATH}_exist";
mongooseUniqueValidator.defaults.type = "mongoose-unique-validator";

export { mongooseUniqueValidator };
