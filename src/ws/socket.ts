import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

export let io: Server | null = null;

export function initSocketServer(httpServer: HttpServer): Server {
  io = new Server(httpServer);

  io.on("connection", (socket: Socket) => {
    console.log("A client is connected: ", socket.id);
  });

  return io;
}
