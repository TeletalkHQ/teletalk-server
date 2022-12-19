const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

class ServiceHandler {
  #defaultExcludeProps = ["_id", "__v"];
  #options = {
    extraExcludeProps: [],
    inputFields: undefined,
    outputFields: undefined,
    shouldExclude: false,
  };

  constructor(serviceBody, options) {
    this.serviceBody = serviceBody;
    this.queryResult = undefined;
    this.#setOptions(options);
  }

  getOptions() {
    return this.#options;
  }
  #setOptions(newOptions = this.getOptions()) {
    this.#options = { ...this.getOptions(), ...newOptions };
  }

  exclude(extraExcludeProps = []) {
    this.#setOptions({
      extraExcludeProps,
      shouldExclude: true,
    });

    return this;
  }

  async run(data, projection, options) {
    const queryResult = await this.serviceBody(data, projection, options);

    const fixedQueryResult = this.#fixResult(queryResult);
    this.#setQueryResult(fixedQueryResult);

    if (this.getOptions().shouldExclude) {
      const filteredQueryResult = this.#excluder();
      this.#setQueryResult(filteredQueryResult);
    }

    return this.queryResult;
  }

  #fixResult(queryResult) {
    if (customTypeof.isObjectNative(queryResult))
      return JSON.parse(JSON.stringify(queryResult));

    return queryResult;
  }

  #setQueryResult(queryResult) {
    this.queryResult = queryResult;
  }

  #excluder() {
    const { extraExcludeProps } = this.getOptions();
    const excludeProps = [...this.#defaultExcludeProps, ...extraExcludeProps];

    const excluder = this.#getExcluder();
    return excluder.call(this, excludeProps);
  }
  #getExcluder() {
    const isQueryResultArray = customTypeof.isArray(this.queryResult);
    return isQueryResultArray
      ? this.#excludeArrayResult
      : this.#excludeObjectResult;
  }
  #excludeObjectResult(excludeProps) {
    return objectUtilities.excludeProps(this.queryResult, excludeProps);
  }
  #excludeArrayResult(excludeProps) {
    return this.queryResult.map((qr) =>
      objectUtilities.excludeProps(qr, excludeProps)
    );
  }
}

const serviceHandler = {
  create: (serviceBody, projection, options) => () =>
    new ServiceHandler(serviceBody, projection, options),
};

module.exports = { serviceHandler, ServiceHandler };
