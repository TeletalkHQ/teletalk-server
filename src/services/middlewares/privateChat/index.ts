import { createPrivateChatIfNotExist } from "./createPrivateChatIfNotExist";
import { findCurrentParticipant } from "./findCurrentParticipant";
import { findPrivateChat } from "./findPrivateChat";
import { findTargetParticipant } from "./findTargetParticipant";
import { throwIfParticipantIsBlacklisted } from "./throwIfParticipantIsBlacklisted";
import { throwIfPrivateChatExist } from "./throwIfPrivateChatExist";

export const privateChatMiddlewares = {
  createPrivateChatIfNotExist,
  findCurrentParticipant,
  findPrivateChat,
  findTargetParticipant,
  throwIfParticipantIsBlacklisted,
  throwIfPrivateChatExist,
};
