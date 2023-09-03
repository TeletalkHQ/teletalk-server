/* eslint-disable no-case-declarations */

/* eslint-disable indent */
import { Socket } from "socket.io-client";
import { Cellphone, FullName } from "utility-store/lib/types";

import { IO, IOCollection, SocketEvent } from "~/types";
import { events } from "~/websocket/events";

import { randomMaker } from "@/classes/RandomMaker";
import { requesterMaker } from "@/classes/Requester";
import { RequesterMaker } from "@/types";

export const requesterMakerHelper = <T extends keyof IOCollection>(
	eventName: T
) => {
	const event = events.find((i) => i.name === eventName)! as SocketEvent<
		IOCollection[T]
	>;

	return (socket: Socket) => {
		return requesterMaker(socket, event);
	};
};

export const setupRequester = async <IOType extends IO>(
	requester: RequesterMaker<IOType>,
	cellphone?: Cellphone,
	fullName?: FullName
) => {
	const { socket, user } = await randomMaker.user(cellphone, fullName);
	return {
		requester: requester(socket),
		user,
		socket,
	};
};

export const requesterCollection = {
	addBlock: requesterMakerHelper("addBlock"),
	addContactWithCellphone: requesterMakerHelper("addContactWithCellphone"),
	addContactWithUserId: requesterMakerHelper("addContactWithUserId"),
	createNewUser: requesterMakerHelper("createNewUser"),
	getChatInfo: requesterMakerHelper("getChatInfo"),
	getContacts: requesterMakerHelper("getContacts"),
	getCountries: requesterMakerHelper("getCountries"),
	getPrivateChat: requesterMakerHelper("getPrivateChat"),
	getPrivateChats: requesterMakerHelper("getPrivateChats"),
	getPublicData: requesterMakerHelper("getPublicData"),
	getStuff: requesterMakerHelper("getStuff"),
	getUserData: requesterMakerHelper("getUserData"),
	getWelcomeMessage: requesterMakerHelper("getWelcomeMessage"),
	joinRoom: requesterMakerHelper("joinRoom"),
	logout: requesterMakerHelper("logout"),
	ping: requesterMakerHelper("ping"),
	pong: requesterMakerHelper("pong"),
	removeBlock: requesterMakerHelper("removeBlock"),
	removeContact: requesterMakerHelper("removeContact"),
	sendMessage: requesterMakerHelper("sendMessage"),
	signIn: requesterMakerHelper("signIn"),
	updateContact: requesterMakerHelper("updateContact"),
	updatePublicData: requesterMakerHelper("updatePublicData"),
	verify: requesterMakerHelper("verify"),
};
