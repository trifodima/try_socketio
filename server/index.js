const express = require('express');
const app = express();
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const rooms = [];
let roomId;
// TODO создать комнаты (не одну как сейчас) , разделить юзеров по комнатам
const createRoom1 = () => {
  roomId = Date.now();
  const lastRoom = rooms[rooms.length - 1];
  let room;
  // если в посл. комнате уже есть 1 клиент
  if (lastRoom && lastRoom.players && lastRoom.players.length === 1) {
    room = lastRoom;
    room.players.push({
      id: 2,
      name: 'Player 2',
    });
    console.log('создали игрока');
  } else {
    room = {
      id: roomId,
      players: [
        {
          id: 1,
          name: 'Player 1',
        }
      ],
    };
    rooms.push(room);
    console.log('создали комнату');
  }
  return {
    success: true,
    room,
    rooms,
    roomId,
  };
}
const singleRoomId = 'Room 1';

io.on('connection', (socket) => {
  const player = {
    id: socket.id,
  }
  socket.on('ADD_PLAYER', ({name}) => {
    player.name = name;
    player.hp = 75;
    const room = {
      id: singleRoomId,
      players: [],
    }
    if (rooms.length === 0) {
      rooms.push(room);
    }
    rooms[0].players.push(player);
    io.emit('PLAYER_CONNECTED', {
      room: rooms[0]
    });
  });

  socket.on('disconnect', () => {
    rooms[0].players = rooms[0].players.filter((item) => item.id !== player.id);
    io.emit('PLAYER_DISCONNECTED', {
      room: rooms[0],
    });

  });
});

httpServer.listen(5000, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log('Сервер запущен!');
});
