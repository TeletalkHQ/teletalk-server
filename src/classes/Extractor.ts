import { Extractor as ExtractorMain } from "utility-store";
import {
	ExtendedFullName,
	ExtendedPublicUserData,
	FullNameWithUserId,
} from "utility-store/lib/types";

import { UserId, UserPublicData } from "~/types/datatypes";

export class Extractor extends ExtractorMain {
	userPublicData(data: ExtendedPublicUserData): UserPublicData {
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
