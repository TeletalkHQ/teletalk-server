import { addBlock } from "~/services/user/addBlock";
import { addContact } from "~/services/user/addContact";
import { addNewClient } from "~/services/user/addNewClient";
import { findOneUser } from "~/services/user/findOneUser";
import { findOneUserById } from "~/services/user/findOneUserById";
import { getUserContacts } from "~/services/user/getUserContacts";
import { removeBlock } from "~/services/user/removeBlock";
import { removeContact } from "~/services/user/removeContact";
import { updateContact } from "~/services/user/updateContact";
import { updatePublicUserData } from "~/services/user/updatePublicUserData";

export const userServices = {
  addBlock,
  addContact,
  addNewClient,
  findOneUser,
  findOneUserById,
  getUserContacts,
  removeBlock,
  removeContact,
  updateContact,
  updatePublicUserData,
};
