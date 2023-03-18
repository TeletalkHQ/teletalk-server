import { randomMaker } from "utility-store";

import { authManager } from "@/classes/AuthManager";
import { requesterCreator } from "$/classes/Requester";
import { userUtilities } from "@/classes/UserUtilities";
import { testVariablesManager } from "$/classes/TestVariablesManager";

import { models } from "@/models";

import { errors } from "@/variables/errors";
import { arrayOfRoutes, ignoredRoutesForAuth } from "@/http/routes";
import { failTestBuilder } from "$/classes/FailTestBuilder";

const userModel = models.native.user;

const requester = (route) => requesterCreator().create(route);

describe("checkCurrentUserStatus middleware success tests", () => {
  //TODO: Add tests: checkCurrentUserStatus middleware success tests
});

//FIXME: Need to make dynamic data
describe("checkCurrentUserStatus middleware fail tests", () => {
  const user = testVariablesManager.getUsers().checkCurrentUserStatus;
  const cellphone = userUtilities.extractCellphone(user);
  const error = errors.CURRENT_USER_NOT_EXIST;

  const filteredIgnoredRoutes = arrayOfRoutes.filter(
    (route) =>
      !ignoredRoutesForAuth.some(
        (ignoredRoute) => ignoredRoute.fullUrl === route.fullUrl
      )
  );

  for (const route of filteredIgnoredRoutes) {
    it(
      failTestBuilder.create().createTestMessage(errors.TOKEN_REQUIRED, route),
      async () => {
        const wrongUserId = randomMaker.string(
          userModel.userId.maxlength.value
        );

        const token = authManager.signToken({
          ...cellphone,
          userId: wrongUserId,
        });

        const { body } = await requester(route).sendFullFeaturedRequest(
          // data,
          error,
          {
            token,
          }
        );

        expect(body.errors[error.key].wrongUserId).toBe(wrongUserId);
      }
    );
  }

  for (const route of filteredIgnoredRoutes) {
    it(
      failTestBuilder.create().createTestMessage(errors.TOKEN_REQUIRED, route),
      async () => {
        const token = authManager.signToken({
          ...cellphone,
          userId: user.userId,
        });

        const { body } = await requester(route).sendFullFeaturedRequest(
          // data,
          error,
          {
            token,
          }
        );

        expect(body.errors[error.key].isSessionExist).toBe(false);
      }
    );
  }

  for (const route of filteredIgnoredRoutes) {
    it(
      failTestBuilder.create().createTestMessage(errors.TOKEN_REQUIRED, route),
      async () => {
        const wrongUserId = randomMaker.string(
          userModel.userId.maxlength.value
        );
        const token = authManager.signToken({
          userId: wrongUserId,
        });

        await requester(route).sendFullFeaturedRequest(
          // data,
          error,
          {
            token,
          }
        );
      }
    );
  }
});
