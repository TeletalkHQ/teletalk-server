export type Field =
  | "bio"
  | "chatId"
  | "clientId"
  | "countryCode"
  | "countryName"
  | "createdAt"
  | "firstName"
  | "id"
  | "isActive"
  | "lastName"
  | "macAddress"
  | "messageId"
  | "messageText"
  | "participantId"
  | "phoneNumber"
  | "senderId"
  | "userId"
  | "username"
  | "verificationCode";

export type * from "./db";
export type * from "./native";

// type AllErrorKeys2 = {
//   bio: SnakeCase<keyof NativeModelCollection["bio"]> extends `required`
//     ? `BIO_REQUIRED_ERROR`
//     : never;
//   username: SnakeCase<keyof NativeModelCollection["username"]> extends `is_empty`
//     ? `USERNAME_IS_EMPTY_ERROR`
//     : never;
// }[Field];

// type SnakeCase<S extends string> = S extends `${infer T1}_${infer T2}`
//   ? `${SnakeCase<T1>}_${SnakeCase<T2>}`
//   : S extends `${infer T1}${infer T2}`
//   ? `${Lowercase<T1>}${SnakeCase<T2>}`
//   : S;

// type AllErrors = `${AllErrorKeys2}`;

// export type ValidationPicker<T extends Field> = Pick<
//   ValidationCollection,
//   Extract<Field, T>
// >;
