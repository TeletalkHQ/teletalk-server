import { findCurrentUser } from "./findCurrentUser";
import { findTargetUser } from "./findTargetUser";
import { saveNewContactItem } from "./saveNewContactItem";
import { throwIfBlacklistItemExist } from "./throwIfBlacklistItemExist";
import { throwIfBlacklistItemNotExist } from "./throwIfBlacklistItemNotExist";
import { throwIfContactExist } from "./throwIfContactExist";
import { throwIfContactNotExist } from "./throwIfContactNotExist";
import { throwIfSelfDataRequested } from "./throwIfSelfDataRequested";
import { throwIfUserExist } from "./throwIfUserExist";

export const userMiddlewares = {
	findCurrentUser,
	findTargetUser,
	saveNewContactItem,
	throwIfBlacklistItemExist,
	throwIfBlacklistItemNotExist,
	throwIfContactExist,
	throwIfContactNotExist,
	throwIfSelfDataRequested,
	throwIfUserExist,
};
