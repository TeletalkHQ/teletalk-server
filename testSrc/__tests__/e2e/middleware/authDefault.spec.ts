// import { expect } from "chai";

// import { requesterCreator } from "$/classes/Requester";

// // import { arrayOfRoutes, ignoredRoutesForAuth } from "@/http/routes";

// import { utilities } from "$/utilities";

// import { errors } from "@/variables/errors";
// import { arrayOfRoutes } from "@/websocket/events";

// const requester = (route) => requesterCreator().create(route);

// describe("authDefault middleware test", () => {
//   for (const route of ignoredRoutesForAuth) {
//     it(`should not get error: TOKEN_REQUIRED - ${route.name}`, async () => {
//       const { response } = await requester(route).sendRequest();

//       const { errors: responseErrors } = response.body;

//       const { key } = errors.TOKEN_REQUIRED;
//       if (responseErrors && responseErrors[key]) {
//         expect(responseErrors[key].reason).not.equal(
//           errors.TOKEN_REQUIRED.reason
//         );
//       }
//     });
//   }

//   const filteredIgnoredRoutes = arrayOfRoutes.filter(
//     (route) =>
//       !ignoredRoutesForAuth.some(
//         (ignoredRoute) => ignoredRoute.name === route.name
//       )
//   );

//   for (const route of filteredIgnoredRoutes) {
//     const message = utilities.createFailTestMessage(
//       errors.TOKEN_REQUIRED,
//       route.name
//     );
//     it(message, async () => {
//       await requester(route)
//         .setOptions({ shouldFilterRequestData: false })
//         .setError(errors.TOKEN_REQUIRED)
//         .sendFullFeaturedRequest();
//     });
//   }
// });
