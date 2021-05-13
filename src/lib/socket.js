import io from "socket.io-client";

let socket;

if (typeof socket === "undefined" || !socket) {
  socket = io(process.env.REACT_APP_BACKEND_URL);
}

export default socket;
