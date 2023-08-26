import { Extractor as ExtractorMain } from "utility-store";
import { ExtendedPublicUserData } from "utility-store/lib/types";

import { UserPublicData } from "~/types/datatypes";

export class Extractor extends ExtractorMain {
	userPublicData(data: ExtendedPublicUserData): UserPublicData {
		return super.publicUserData(data);
	}
}

export const extractor = new Extractor();
