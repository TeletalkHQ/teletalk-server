import { nativeModelBuilder } from "~/classes/modelBuilder/NativeModelBuilder";

import { commonModels } from "~/models/native/common";

import {
  Bio,
  Blacklist,
  ClientId,
  Clients,
  Contacts,
  CountryCode,
  CountryName,
  FirstName,
  IsActive,
  LastName,
  MacAddress,
  PhoneNumber,
  Status,
  Username,
  VerificationCode,
} from "~/types";

export const userModels = {
  bio: nativeModelBuilder
    .create<Bio>()
    .type("string")
    .required(true)
    .empty(true)
    .trim(true)
    .minLength(0)
    .defaultValue("")
    .maxLength(255)
    .build(),
  blacklist: nativeModelBuilder
    .create<Blacklist>()
    .type("array")
    .required(true)
    .empty(true)
    .build(),
  clientId: nativeModelBuilder
    .create<ClientId>()
    .type("string")
    .empty(false)
    .required(true)
    .minLength(100)
    .maxLength(500)
    .unique(true)
    .trim(true)
    .build(),
  clients: nativeModelBuilder
    .create<Clients>()
    .type("array")
    .required(true)
    .empty(true)
    .build(),
  contacts: nativeModelBuilder
    .create<Contacts>()
    .type("array")
    .required(true)
    .empty(true)
    .build(),
  countryCode: nativeModelBuilder
    .create<CountryCode>()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(1)
    .maxLength(4)
    .numeric(true)
    .trim(true)
    .build(),
  countryName: nativeModelBuilder
    .create<CountryName>()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(2)
    .maxLength(50)
    .trim(true)
    .build(),
  createdAt: commonModels.createdAt,
  firstName: nativeModelBuilder
    .create<FirstName>()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(2)
    .maxLength(18)
    .trim(true)
    .build(),
  isActive: nativeModelBuilder
    .create<IsActive>()
    .type("boolean")
    .required(true)
    .defaultValue(false)
    .build(),
  lastName: nativeModelBuilder
    .create<LastName>()
    .type("string")
    .required(true)
    .empty(true)
    .minLength(2)
    .maxLength(18)
    .trim(true)
    .build(),
  macAddress: nativeModelBuilder
    .create<MacAddress>()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(12)
    .maxLength(16)
    .trim(true)
    .unique(true)
    .build(),
  phoneNumber: nativeModelBuilder
    .create<PhoneNumber>()
    .type("string")
    .required(true)
    .empty(false)
    .minLength(10)
    .maxLength(14)
    .numeric(true)
    .unique(true)
    .build(),
  status: nativeModelBuilder
    .create<Status>()
    .type("object")
    .required(true)
    .build(),
  userId: commonModels.id,
  username: nativeModelBuilder
    .create<Username>()
    .type("string")
    .required(true)
    .empty(true)
    .minLength(0)
    .maxLength(12)
    .unique(false)
    .trim(true)
    .build(),
  verificationCode: nativeModelBuilder
    .create<VerificationCode>()
    .type("string")
    .required(true)
    .empty(false)
    .length(6)
    .numeric(true)
    .trim(true)
    .build(),
};
