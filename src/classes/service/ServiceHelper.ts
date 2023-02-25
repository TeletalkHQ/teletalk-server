const { customTypeof } = require("custom-typeof");
const { errorThrower } = require("utility-store/src/utilities/utilities");

const { commonServices } = require("@/services/common");

class ServiceHelper {
  async findOneUser(queryData, error) {
    const user = await commonServices.findOneUser(queryData);
    errorThrower(customTypeof.isNull(user), () => ({
      ...error,
      queryData,
    }));

    return user;
  }
  async findOneUserById(userId, error) {
    return await this.findOneUser({ userId }, error);
  }
}

const serviceHelper = new ServiceHelper();

module.exports = {
  serviceHelper,
  ServiceHelper,
};
