import express from "express";
import apiRouter from "./routes/apiRouter.js";
import connectDB from "./config/dbConfig.js";
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import ChannelSocketHandlers from './controllers/channelSocketController.js';
import MessageSocketHandlers from './controllers/messageSocketController.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.get("/ping", (req, res) => {
  res.json({
    ping: "pong",
    server: "live",
  });
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  MessageSocketHandlers(io, socket);
  ChannelSocketHandlers(io, socket);
});


const emailToSocket = new Map();
const socketToEmail = new Map();

io.on("connection", (socket) => {
//   console.log("socket connected", socket);
  socket.on("join-room", (data) => {
    // console.log(data);
    emailToSocket.set(data.email, socket);
    socketToEmail.set(socket, data.email);
    io.to(data.room).emit("user-joined", { email: data.email, id: socket.id });
    socket.join(data.room);
    io.to(socket.id).emit("join-room", data);
  });

  // Incoming call handle
  socket.on("user-call", ({ offer, to }) => {
    // console.log("user-call", to);
    io.to(to).emit("incoming-call", { offer, from: socket.id });
  });

  // Answer call ( for one who received call )
  socket.on("call-accepted", ({ to, ans }) => {
    // console.log('call accepted', ans);
    io.to(to).emit("call-accepted", { from: socket.id, ans });
  });

  // Call negotiation needed
  socket.on("peer-negotiation-needed", ({ to, offer }) => {
    // console.log("peer-negotiation-needed", offer);
    io.to(to).emit("peer-negotiation-needed", { from: socket.id, offer });
  });

  // Call negotiation done
  socket.on("peer-negotiation-done", ({ to, ans }) => {
    // console.log("peer-negotiation-done", ans);
    io.to(to).emit("peer-negotiation-final", { from: socket.id, ans });
  });

}); 


server.listen(3001, async () => {
  console.log("server is running");
  connectDB();
});
 