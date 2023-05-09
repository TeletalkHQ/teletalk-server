import { UserUtilities as UserUtilitiesMain } from "utility-store";

class UserUtilities extends UserUtilitiesMain {
  constructor() {
    super();
  }
}

const userUtilities = new UserUtilities();

export { userUtilities };
