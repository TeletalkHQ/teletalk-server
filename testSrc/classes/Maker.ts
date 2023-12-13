import type {
  ExtendedFullName,
  FullNameWithUserId,
  UserPublicData,
} from "teletalk-type-store";
import { Maker as MakerMain } from "utility-store";

export class Maker extends MakerMain {
  //@ts-ignore
  emptyContact() {
    return {
      ...super.emptyContact(),
      isContact: false,
      userId: "",
    };
  }

  emptyUserPublicData(): UserPublicData {
    return {
      ...super.emptyFullName(),
      bio: "",
      userId: "",
      username: "",
    };
  }

  emptyContactWithUserId(): FullNameWithUserId {
    return {
      ...super.emptyFullName(),
      userId: "",
    };
  }

  originalFullName(d: Partial<ExtendedFullName>) {
    return {
      originalFirstName: d.firstName || "",
      originalLastName: d.lastName || "",
    };
  }
}

export const maker = new Maker();
