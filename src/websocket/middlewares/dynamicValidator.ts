import { trier } from "simple-trier";

import {
  Field,
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "@/types";

import { validators } from "@/validators";

import { customTypeof } from "custom-typeof";

type Data = { [prop: string]: any };

const dynamicValidator: SocketMiddleware = async (
  _socket,
  next,
  [_name, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(dynamicValidator.name)
    .tryAsync(tryBlock, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .runAsync();
};

const tryBlock = async (data: Data) => {
  await validateField(data);
  return { ok: true };
};

const validateField = async (data: Data) => {
  for (const key in data) {
    const value = data[key as Field];

    if (customTypeof.isObject(value)) {
      await validateField(value);
      continue;
    }

    if (customTypeof.isArray(value)) {
      for (const item of value) {
        await validateField(item);
      }
      continue;
    }

    await validators[key as Field](value);
  }
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { dynamicValidator };

// const fn = async () => {
//   try {
//     console.log("validating...");

//     await validateField({
//       bio: "222",
//       hello: {
//         how: {
//           are: {
//             you: {
//               firstName: "wow!",
//               phoneNumber: "oops!",
//             },
//           },
//         },
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// await fn();
