class EnvironmentManager {
  getEnvironment() {
    return process.env;
  }
}

const envManager = new EnvironmentManager();

export { envManager };
