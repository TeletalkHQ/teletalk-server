import {
	ExtendedFullName,
	ExtendedUserPublicData,
	FullNameWithUserId,
	UserId,
	UserPublicData,
} from "teletalk-type-store";
import { Extractor as ExtractorMain } from "utility-store";

export class Extractor extends ExtractorMain {
	userPublicData(data: ExtendedUserPublicData): UserPublicData {
		return super.publicUserData(data);
	}

	contactWithUserId(
		data: ExtendedFullName & { userId: UserId }
	): FullNameWithUserId {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
			userId: data.userId,
		};
	}
}

export const extractor = new Extractor();
