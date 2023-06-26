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
