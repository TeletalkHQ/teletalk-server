import { addBlock } from "@/services/user/addBlock";
import { addContact } from "@/services/user/addContact";
import { addNewSession } from "@/services/user/addNewSession";
import { getAllUsers } from "@/services/user/getAllUsers";
import { getUserContacts } from "@/services/user/getUserContacts";
import {
  getCurrentUserData,
  getTargetUserData,
} from "@/services/user/getUserData";
import { removeBlock } from "@/services/user/removeBlock";
import { removeContact } from "@/services/user/removeContact";
import { updateContact } from "@/services/user/updateContact";
import { updatePublicUserData } from "@/services/user/updatePublicUserData";
import { updateOnlineStatus } from "@/services/user/updateOnlineStatus";

const userServices = {
  addBlock,
  addContact,
  addNewSession,
  getAllUsers,
  getCurrentUserData,
  getTargetUserData,
  getUserContacts,
  removeBlock,
  removeContact,
  updateContact,
  updateOnlineStatus,
  updatePublicUserData,
};

export { userServices };
