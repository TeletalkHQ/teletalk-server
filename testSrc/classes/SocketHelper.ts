import { io as Client } from "socket.io-client";

import { appConfigs } from "@/classes/AppConfigs";

import { ServerSocket } from "@/types";

let serverSocket: ServerSocket;

class SocketHelper {
  static initialize(socket: ServerSocket) {
    serverSocket = socket;
  }

  getServerSocket() {
    return serverSocket;
  }

  createClient() {
    const port = appConfigs.getConfigs().server.exactPort;
    const serverUrl = `http://localhost:${port}`;

    const client = Client(serverUrl, {
      autoConnect: false,
      withCredentials: true,
    });

    client.connect();

    return client;
  }
}

const socketHelper = new SocketHelper();

export { socketHelper };
