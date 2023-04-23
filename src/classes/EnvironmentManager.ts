class EnvironmentManager {
  getEnvironment() {
    return process.env;
  }

  getNodeEnv() {
    return this.getEnvironment().NODE_ENV;
  }
}

const envManager = new EnvironmentManager();

export { envManager };
