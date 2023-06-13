class EnvironmentManager {
  getEnv() {
    return process.env;
  }

  getNodeEnv() {
    return this.getEnv().NODE_ENV;
  }
}

const envManager = new EnvironmentManager();

export { envManager };
