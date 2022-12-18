const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { errorThrower } = require("utility-store/src/functions/utilities");

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

module.exports = { ServiceHelper, serviceHelper };
