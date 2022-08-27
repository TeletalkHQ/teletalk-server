const { regex } = require("@/variables/others/regex");

class CustomTypeof {
  isEveryTypeCheckTrue(items = [], type) {
    return items.every((value) => typeof value === type);
  }

  check(value) {
    const type = {
      array: false,
      nan: false,
      null: false,
      function: false,
      string: false,
      number: false,
      object: false,
      boolean: false,
      undefined: false,
      stringNumber: false,
    };

    if (this.isNaN(value)) {
      type.nan = true;
    } else {
      type.stringNumber = true;
    }

    if (this.isArray(value)) {
      type.array = true;
    } else if (this.isNull(value)) {
      type.null = true;
    } else {
      type[typeof value] = true;
    }

    return { type, truthy: this.isNull(value) ? false : !!value };
  }

  isNaN(...items) {
    return items.every((value) => isNaN(value));
  }

  isNull(...items) {
    return items.every((value) => value === null);
  }

  isArray(...items) {
    return items.every((value) => Array.isArray(value));
  }

  isFunction(...items) {
    return this.isEveryTypeCheckTrue(items, "function");
  }

  isNumber(...items) {
    return items.every((item) => regex.enNumber.test(item));
  }

  isBoolean(...items) {
    return this.isEveryTypeCheckTrue(items, "boolean");
  }

  isTruthy(...items) {
    return items.every((item) => !!item === true);
  }
}

const customTypeof = new CustomTypeof();

module.exports = { customTypeof, CustomTypeof };
