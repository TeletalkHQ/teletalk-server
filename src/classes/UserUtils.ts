import { EmptyUserData } from "teletalk-type-store";
import { UserUtils as UserUtilitiesMain } from "utility-store";

type EmptyDBUserData = Omit<EmptyUserData, "contacts"> & { contacts: [] };

class UserUtils extends UserUtilitiesMain {
  constructor() {
    super();
  }

  getDBDefaultUserData(): EmptyDBUserData {
    return {
      ...super.getDefaultUserData(),
      contacts: [],
    };
  }
}

export const userUtils = new UserUtils();
