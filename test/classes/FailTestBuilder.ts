import { errors } from "@/variables/errors";
import { randomMaker } from "utility-store";

//REFACTOR:Major
class FailTestBuilder {
  constructor(configuredRequester, data, model, testingPropertyName) {
    this.configuredRequester = configuredRequester;
    this.data = data;
    this.model = model;
    this.testingPropertyName = testingPropertyName;
  }
  setRequirements(configuredRequester, model, data, testingPropertyName) {
    this.setModel(model)
      .setData(data)
      .setConfiguredRequester(configuredRequester)
      .setTestingPropertyName(testingPropertyName);
    return this;
  }
  setConfiguredRequester(configuredRequester) {
    this.configuredRequester = configuredRequester;
    return this;
  }
  getConfiguredRequester() {
    return this.configuredRequester;
  }
  setModel(model) {
    this.model = model;
    return this;
  }
  getModel() {
    return this.model;
  }

  setData(data) {
    this.data(data);
    return this;
  }
  setTestingPropertyName(testingPropertyName) {
    this.testingPropertyName = testingPropertyName;
    return this;
  }
  getTestingPropertyName() {
    return this.testingPropertyName;
  }
  getMinlength() {
    return this.model.minlength?.value;
  }
  getMaxlength() {
    return this.model.maxlength?.value;
  }
  getLength() {
    return this.model.length?.value;
  }
  dataMerger(newValue) {
    return { ...this.data, [this.testingPropertyName]: newValue };
  }
  resolveError(key) {
    return this.model[key].error;
  }

  custom(value, error) {
    const mergedData = this.dataMerger(value);
    this.initTest(mergedData, error);
    return this;
  }
  empty(value = "") {
    this.custom(value, this.resolveError("empty"));
    return this;
  }
  missing() {
    const mergedData = this.dataMerger();
    this.initTest(mergedData, errors.INPUT_FIELDS_MISSING);
    return this;
  }
  overload() {
    const overloadedData = {
      ...this.data,
      [randomMaker.string(10)]: randomMaker.string(10),
    };
    this.initTest(overloadedData, errors.INPUT_FIELDS_OVERLOAD);
    return this;
  }
  invalidType(value) {
    const valueWithIncorrectType =
      value || randomMaker.number(this.getMaxlength);
    const mergedData = this.dataMerger(valueWithIncorrectType);
    this.initTest(mergedData, errors.INPUT_FIELD_INVALID_TYPE);
    return this;
  }
  numeric() {
    const randomValue = randomMaker.string(this.getMaxlength() - 1) + "!";
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveError("numeric"));
    return this;
  }
  minlength() {
    if (this.getMinlength() > 1) {
      const randomValue = randomMaker.string(this.getMinlength() - 1);
      const mergedData = this.dataMerger(randomValue);
      this.initTest(mergedData, this.resolveError("minlength"));
    }
    return this;
  }
  maxlength(value) {
    const randomValue = value || randomMaker.string(this.getMaxlength() + 1);
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveError("maxlength"));
    return this;
  }
  length(value) {
    const randomValue = value || randomMaker.string(this.getLength() + 1);
    const mergedData = this.dataMerger(randomValue);
    this.initTest(mergedData, this.resolveError("length"));
    return this;
  }

  initTest(data, error, options) {
    it(
      this.createTestMessage(
        error,
        this.configuredRequester.getRoute().fullUrl
      ),
      async () => {
        await this.configuredRequester.sendFullFeaturedRequest(
          data,
          error,
          options
        );
      }
    );
  }

  createTestMessage(error, url) {
    return `expected error: [url|${url.fullUrl || url}] [errorKey|${
      error.errorKey
    }] [reason|${error.reason}] - [statusCode|${error.statusCode}] `;
  }
}

const failTestBuilder = {
  create: (configuredRequester, data, model, testingPropertyName) =>
    new FailTestBuilder(configuredRequester, data, model, testingPropertyName),
};

export { FailTestBuilder, failTestBuilder };
