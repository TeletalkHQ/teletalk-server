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
      stringEmpty: "stringEmpty",
      stringMin: "stringMin",
      stringMax: "stringMax",
      stringLength: "stringLength",
      stringPattern: "stringPattern",
      stringContains: "stringContains",
      stringEnum: "stringEnum",
      stringNumeric: "stringNumeric",
      stringAlpha: "stringAlpha",
      stringAlphanum: "stringAlphanum",
      stringAlphadash: "stringAlphadash",
      stringHex: "stringHex",
      stringSingleLine: "stringSingleLine",
      stringBase64: "stringBase64",
      number: "number",
      numberMin: "numberMin",
      numberMax: "numberMax",
      numberEqual: "numberEqual",
      numberNotEqual: "numberNotEqual",
      numberInteger: "numberInteger",
      numberPositive: "numberPositive",
      numberNegative: "numberNegative",
      array: "array",
      arrayEmpty: "arrayEmpty",
      arrayMin: "arrayMin",
      arrayMax: "arrayMax",
      arrayLength: "arrayLength",
      arrayContains: "arrayContains",
      arrayUnique: "arrayUnique",
      arrayEnum: "arrayEnum",
      tuple: "tuple",
      tupleEmpty: "tupleEmpty",
      tupleLength: "tupleLength",
      boolean: "boolean",
      function: "function",
      date: "date",
      dateMin: "dateMin",
      dateMax: "dateMax",
      forbidden: "forbidden",
      email: "email",
      emailEmpty: "emailEmpty",
      emailMin: "emailMin",
      emailMax: "emailMax",
      url: "url",
      enumValue: "enumValue",
      equalValue: "equalValue",
      equalField: "equalField",
      object: "object",
      objectStrict: "objectStrict",
      objectMinProps: "objectMinProps",
      objectMaxProps: "objectMaxProps",
      uuid: "uuid",
      uuidVersion: "uuidVersion",
      mac: "mac",
      luhn: "luhn",
    },
    key: "type",
  },
};

const stateKeys = {
  temporaryClients: "temporaryClients",
  aliveClients: "aliveClients",
  users: "users",
  testUsers: "testUsers",

  /**
   * Shadow values come from test or etc... =>
   *testUser_0: "testUser_0",
   *testUser_1: "testUser_1",
   *testUser_2: "testUser_2",
   *testUser_...: "testUser_...",
   */
};

const inputOutputFields = {
  addedContact: "addedContact",
  bio: "bio",
  blacklist: "blacklist",
  blockedCellphone: "blockedCellphone",
  chats: "chats",
  contacts: "contacts",
  countryCode: "countryCode",
  countryName: "countryName",
  firstName: "firstName",
  lastName: "lastName",
  macAddress: "macAddress",
  mainToken: "mainToken",
  newUser: "newUser",
  phoneNumber: "phoneNumber",
  privateId: "privateId",
  user: "user",
  username: "username",
  verificationCode: "verificationCode",
  verifyToken: "verifyToken",
  editedContact: "editedContact",
  removedBlockedCellphone: "removedBlockedCellphone",
  removedContact: "removedContact",
};

const initialValue = {
  modelGeneratorInitialProperties,
  errorGeneratorInitialProperties,
  initialValidatorPropValues,
  stateKeys,
};

module.exports = {
  initialValue,
  inputOutputFields,
};
