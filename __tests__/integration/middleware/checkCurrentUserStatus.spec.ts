// import { expect } from "chai";
// import { randomMaker } from "utility-store";

// import { authManager } from "@/classes/AuthManager";
// import { requesterCreator } from "$/classes/Requester";
// import { userUtilities } from "@/classes/UserUtilities";
// import { testVariablesManager } from "$/classes/TestVariablesManager";

// import { models } from "@/models";

// import { ClientSocket, SocketRoute } from "@/types";

// import { utilities } from "$/utilities";

// import { errors } from "@/variables/errors";

// import { arrayOfRoutes, ignoredRoutesForAuth } from "@/websocket/events";

// const userModel = models.native.user;

// const requester = (socket: ClientSocket, route: SocketRoute) =>
//   requesterCreator(socket, route);

// describe("checkCurrentUserStatus middleware success tests", () => {
//   //TODO: Add tests: checkCurrentUserStatus middleware success tests
// });

// //FIXME: Need to make dynamic data
// describe("checkCurrentUserStatus middleware fail tests", () => {
//   const user = testVariablesManager.getUsers().checkCurrentUserStatus;
//   const cellphone = userUtilities.extractCellphone(user);
//   const error = errors.CURRENT_USER_NOT_EXIST;

//   const filteredIgnoredRoutes = arrayOfRoutes.filter(
//     (route) =>
//       !ignoredRoutesForAuth.some(
//         (ignoredRoute) => ignoredRoute.name === route.name
//       )
//   );

//   for (const route of filteredIgnoredRoutes) {
//     it(
//       utilities.createFailTestMessage(errors.TOKEN_REQUIRED, route),
//       async () => {
//         const wrongUserId = randomMaker.string(
//           userModel.userId.maxlength.value
//         );

//         const token = authManager.signToken({
//           ...cellphone,
//           userId: wrongUserId,
//         });

//         const { body } = await requester(route).sendFullFeaturedRequest(
//           // data,
//           error,
//           {
//             token,
//           }
//         );

//         expect(body.errors[error.key].wrongUserId).to.be.equal(wrongUserId);
//       }
//     );
//   }

//   for (const route of filteredIgnoredRoutes) {
//     it(
//       utilities.createFailTestMessage(errors.TOKEN_REQUIRED, route),
//       async () => {
//         const token = authManager.signToken({
//           ...cellphone,
//           userId: user.userId,
//         });

//         const { body } = await requester(route).sendFullFeaturedRequest(
//           // data,
//           error,
//           {
//             token,
//           }
//         );

//         expect(body.errors[error.key].isSessionExist).to.be.false;
//       }
//     );
//   }

//   for (const route of filteredIgnoredRoutes) {
//     it(
//       utilities.createFailTestMessage(errors.TOKEN_REQUIRED, route),
//       async () => {
//         const wrongUserId = randomMaker.string(
//           userModel.userId.maxlength.value
//         );
//         const token = authManager.signToken({
//           userId: wrongUserId,
//         });

//         await requester(route).sendFullFeaturedRequest(
//           // data,
//           error,
//           {
//             token,
//           }
//         );
//       }
//     );
//   }
// });
