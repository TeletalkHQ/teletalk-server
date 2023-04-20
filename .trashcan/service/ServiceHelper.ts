import { customTypeof } from "custom-typeof";
import { errorThrower } from "utility-store";

import { commonServices } from "@/services/common";

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

export { serviceHelper, ServiceHelper };
