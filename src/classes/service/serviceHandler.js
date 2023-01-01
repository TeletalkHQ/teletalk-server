const { customTypeof } = require("custom-typeof");
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

class ServiceHandler {
  #defaultExcludeProps = ["_id", "__v"];
  #queryResult = undefined;
  #serviceBody = undefined;
  #options = {
    extraExcludeProps: [],
    inputFields: undefined,
    outputFields: undefined,
    shouldExclude: false,
  };

  constructor(serviceBody, options) {
    this.setOptions(options);
    this.#serviceBody = serviceBody;
  }

  getOptions() {
    return this.#options;
  }
  setOptions(newOptions = this.getOptions()) {
    this.#options = { ...this.getOptions(), ...newOptions };
  }

  exclude(extraExcludeProps = []) {
    this.setOptions({
      extraExcludeProps,
      shouldExclude: true,
    });

    return this;
  }

  async run(data, projection, options) {
    const queryResult = await this.#serviceBody(data, projection, options);

    const fixedQueryResult = this.fixQueryResult(queryResult);
    this.setQueryResult(fixedQueryResult);

    this.handleExclude();

    return this.getQueryResult();
  }

  fixQueryResult(queryResult) {
    if (customTypeof.isObjectNative(queryResult))
      return JSON.parse(JSON.stringify(queryResult));

    return queryResult;
  }

  getQueryResult() {
    return this.#queryResult;
  }
  setQueryResult(queryResult) {
    this.#queryResult = queryResult;
  }

  handleExclude() {
    if (this.getOptions().shouldExclude) {
      const filteredQueryResult = this.excluder();
      this.setQueryResult(filteredQueryResult);
    }
  }

  excluder() {
    const { extraExcludeProps } = this.getOptions();
    const excludeProps = [...this.#defaultExcludeProps, ...extraExcludeProps];

    const excluder = this.#getExcluder();
    return excluder.call(this, excludeProps);
  }
  #getExcluder() {
    const isQueryResultArray = customTypeof.isArray(this.getQueryResult());
    return isQueryResultArray
      ? this.#excludeArrayResult
      : this.#excludeObjectResult;
  }
  #excludeObjectResult(excludeProps) {
    return objectUtilities.excludeProps(this.getQueryResult(), excludeProps);
  }
  #excludeArrayResult(excludeProps) {
    return this.getQueryResult().map((qr) =>
      objectUtilities.excludeProps(qr, excludeProps)
    );
  }
}

const serviceHandler = {
  create: (serviceBody, projection, options) => () =>
    new ServiceHandler(serviceBody, projection, options),
};

module.exports = { serviceHandler, ServiceHandler };
