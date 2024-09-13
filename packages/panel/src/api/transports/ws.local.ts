import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import { localConfig } from "./configs";

const socket = io("", { path: localConfig.rest + localConfig.socket });
const transport = socketio(socket);

export default transport;
