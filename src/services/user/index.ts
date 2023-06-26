import { addBlock } from "~/services/user/addBlock";
import { addContact } from "~/services/user/addContact";
import { addNewClient } from "~/services/user/addNewClient";
import { getAllUsers } from "~/services/user/getAllUsers";
import { getUserContacts } from "~/services/user/getUserContacts";
import { getTargetUserData, getUserData } from "~/services/user/getUserData";
import { removeBlock } from "~/services/user/removeBlock";
import { removeContact } from "~/services/user/removeContact";
import { updateContact } from "~/services/user/updateContact";
import { updatePublicUserData } from "~/services/user/updatePublicUserData";

const userServices = {
  addBlock,
  addContact,
  addNewClient,
  getAllUsers,
  getTargetUserData,
  getUserContacts,
  getUserData,
  removeBlock,
  removeContact,
  updateContact,
  updatePublicUserData,
};

export { userServices };
