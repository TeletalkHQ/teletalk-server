// import chai from "chai";

// import { requesterCreator } from "$/classes/Requester";

//

// import { errors } from "@/variables/errors";
// import { METHODS } from "@/variables/others/methods";

// import { arrayOfRoutes } from "@/websocket/events";

// describe("requestMethodChecker middleware tests", () => {
//   const methods = Object.values(METHODS);

//   for (const route of arrayOfRoutes) {
//     const message = helpers.createFailTestMessage(
//       errors.METHOD_NOT_ALLOWED,
//       route.name
//     );
//     it(message, async () => {
//       const foundWrongMethod = methods.find((m) => m !== route.method);

//       const brokenRoute = {
//         ...route,
//         method: foundWrongMethod,
//       };

//       const requester = requesterCreator().create(brokenRoute);
//       await requester
//         .setOptions({ shouldFilterRequestData: false })
//         .setError(errors.METHOD_NOT_ALLOWED)
//         .sendFullFeaturedRequest();
//     });
//   }

//   for (const route of arrayOfRoutes) {
//     it(`should not get error: METHOD_NOT_ALLOWED - ${route.name}`, async () => {
//       const requester = requesterCreator().create(route);
//       const { response } = await requester.sendRequest();

//       const { errors: responseErrors } = response.body;

//       const { key } = errors.METHOD_NOT_ALLOWED;
//       if (responseErrors && responseErrors[key]) {
//         chai.expect(responseErrors[key].reason).not.equal(
//           errors.METHOD_NOT_ALLOWED.reason
//         );
//       }
//     });
//   }
// });
