import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";

import { commonModels } from "@/models/native/common";

import { NativeModelPicker } from "@/types";

type UserModels = NativeModelPicker<
  | "bio"
  | "blacklist"
  | "contacts"
  | "countryCode"
  | "countryName"
  | "createdAt"
  | "firstName"
  | "isActive"
  | "lastName"
  | "macAddress"
  | "phoneNumber"
  | "session"
  | "sessions"
  | "status"
  | "userId"
  | "username"
  | "verificationCode"
>;

export const userModels: UserModels = {
  bio: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(true)
    .trim(true)
    .minLength(0)
    .defaultValue("")
    .maxLength(255)
    .build(),
  blacklist: nativeModelBuilder
    .create()
    .type("array")
    .required(true)
    .empty(true)
    .build(),
  contacts: nativeModelBuilder
    .create()
    .type("array")
    .required(true)
    .empty(true)
    .build(),
  countryCode: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(1)
    .maxLength(4)
    .numeric(true)
    .trim(true)
    .build(),
  countryName: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(2)
    .maxLength(50)
    .trim(true)
    .build(),
  createdAt: commonModels.createdAt,
  firstName: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(2)
    .maxLength(18)
    .trim(true)
    .build(),
  isActive: nativeModelBuilder
    .create()
    .type("boolean")
    .required(true)
    .defaultValue(false)
    .build(),
  lastName: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(true)
    .minLength(2)
    .maxLength(18)
    .trim(true)
    .build(),
  macAddress: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(12)
    .maxLength(16)
    .trim(true)
    .unique(true)
    .build(),
  phoneNumber: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(10)
    .maxLength(14)
    .numeric(true)
    .unique(true)
    .build(),
  session: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(100)
    .maxLength(500)
    .unique(true)
    .build(),
  sessions: nativeModelBuilder
    .create()
    .type("array")
    .required(true)
    .empty(true)
    .build(),
  status: nativeModelBuilder
    .create()
    .type("object")
    .required(true)
    .defaultValue({})
    .build(),
  userId: commonModels.userId,
  username: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(true)
    .minLength(0)
    .maxLength(12)
    .unique(false)
    .trim(true)
    .build(),
  verificationCode: nativeModelBuilder
    .create()
    .type("string")
    .required(true)
    .empty(false)
    .length(6)
    .numeric(true)
    .trim(true)
    .build(),
};
