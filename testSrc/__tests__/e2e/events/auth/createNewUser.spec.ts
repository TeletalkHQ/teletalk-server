import { authHelper } from "@/classes/AuthHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.e2eSuccessDescribe("createNewUser", "event"),
  () => {
    it(
      utils.createTestMessage.e2eSuccessTest(
        "createNewUser",
        "event",
        "should create new user"
      ),
      async () => {
        const cellphone = randomMaker.unusedCellphone();
        const fullName = randomMaker.fullName();

        const helper = authHelper(cellphone, fullName);

        await helper.createComplete();
      }
    );
  }
);
