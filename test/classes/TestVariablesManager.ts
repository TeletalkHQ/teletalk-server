class TestVariablesManager {
  constructor() {
    this.successTestDefaultOptions = {
      modelCheck: true,
      stringEquality: true,
    };
  }
}

const testVariablesManager = new TestVariablesManager();

export { TestVariablesManager, testVariablesManager };
