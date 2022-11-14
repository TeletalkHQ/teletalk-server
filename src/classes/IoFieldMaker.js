class IoFieldMaker {
  #field = {
    type: undefined,
    value: undefined,
  };

  type(type) {
    this.#field.type = type;
    return this;
  }
  value(value) {
    this.#field.value = value;
    return this;
  }
  build() {
    return this.#field;
  }
}

const ioFieldMaker = { create: () => new IoFieldMaker() };

module.exports = { IoFieldMaker, ioFieldMaker };
