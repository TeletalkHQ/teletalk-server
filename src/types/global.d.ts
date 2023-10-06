import { LoggerChalker } from "logger-chalker";
import { Server } from "socket.io";
import { EncryptedSession, EventName, SessionId } from "teletalk-type-store";

import {
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
		customEmit: CustomEmit;
		customOn: CustomOn;
		customUse: CustomUse;
		eventName: EventName;
		io: Server;
		sessionId: SessionId;
		use: (fn: (event: SocketMiddlewareEvent, next: SocketNext) => void) => void;
	}
}

declare module "socket.io-client" {
	interface Socket {
		session: EncryptedSession;
	}
}

declare global {
	namespace NodeJS {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface ProcessEnv extends Environments {}
	}
}

export {};
