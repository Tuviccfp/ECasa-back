const jwt = require("jsonwebtoken");
const secret = process.env.JWT_TOKEN;
const socketIo = require("socket.io");
const Message = require('../models/message');

function connectionAndSetupSocket(server) {
  const io = socketIo(server);

  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.query.token || socket.handshake.headers.xoxota;
      const decoded = verifyToken(token);
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      console.error("WebSocket authentication error:", error.message);
      next(new Error("Authentication failed"));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User ${socket.userId} connected`);

    socket.on('private message', async ({receiverId, content}) => {
        try {
            const senderId = socket.userId;
            
            const message = new Message({
                sender: senderId,
                receiver: receiverId,
                content
            });
            
            await message.save();

            io.to(senderId).emit('private message', message);
            io.to(receiverId).emit('private message', message);
        } catch (error) {
            console.error('Error handling private message: ', error);
        }
    });
    socket.on('disconnect', () => {
        console.log(`User ${socket.userId} disconnected`);
    });
  });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido");
  }
}
module.exports = connectionAndSetupSocket;
