import { io } from "socket.io-client";

export const socket = io("https://wordl-server.onrender.com", {
  forceNew: true,
});
