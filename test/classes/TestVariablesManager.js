class TestVariablesManager {
  constructor() {
    this.successTestDefaultOptions = {
      modelCheck: true,
      stringEquality: true,
    };
  }
}

const testVariablesManager = new TestVariablesManager();

module.exports = { TestVariablesManager, testVariablesManager };
