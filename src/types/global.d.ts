import { LoggerChalker } from "logger-chalker";
import { Server } from "socket.io";
import { ClientId, UserId } from "teletalk-type-store";

import {
	AuthClient,
	CustomEmit,
	CustomOn,
	CustomUse,
	Environments,
	SocketMiddlewareEvent,
	SocketNext,
} from "~/types";


declare global {
	// eslint-disable-next-line no-var
	var logger: LoggerChalker;
}

declare module "socket.io" {
	interface Socket {
		use: (fn: (event: SocketMiddlewareEvent, next: SocketNext) => void) => void;
		clientId: ClientId;
		customEmit: CustomEmit;
		customOn: CustomOn;
		customUse: CustomUse;
		io: Server;
		authClient: AuthClient;
		userId: UserId;
		clientStr: string;
	}
}

declare module "socket.io-client" {
	interface Socket {
		clientId: string;
	}
}

declare global {
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface ProcessEnv extends Environments {}
	}
}

export {};
