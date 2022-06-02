const lodash = require("lodash");
const { nanoid } = require("nanoid");

class RandomMaker {
  // constructor() {}

  randomString(length) {
    var chars =
      "abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
    var pwd = lodash.sampleSize(chars, length ?? 12);
    return pwd.join("");
  }

  randomStringNumber(length) {
    var chars = "12345678901234567890123456789012345678901234567890";
    var pwd = lodash.sampleSize(chars, length ?? 10);
    return pwd.join("");
  }

  randomNumber(length) {
    var chars = "12345678901234567890123456789012345678901234567890";
    var pwd = lodash.sampleSize(chars, length ?? 10);
    return pwd.join("");
  }

  randomCountryCode() {
    return (
      Math.floor(Math.random() * 100 * Math.random()) +
      Math.floor(Math.random() * 10)
    );
  }

  randomId(size = 30) {
    return nanoid(size);
  }
}

const randomMaker = new RandomMaker();

module.exports = { RandomMaker, randomMaker };
