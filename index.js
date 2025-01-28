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

server.listen(3001, async () => {
  console.log("server is running");
  connectDB();
});
 