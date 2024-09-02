import http from "http";
import { Server } from "socket.io";
const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_code", (data) => {
    console.log("code", data);
    io.emit("recive_code", data);
  });
  socket.on("send_output", (data) => {
    console.log("output", data);
    io.emit("recive_output", data);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
