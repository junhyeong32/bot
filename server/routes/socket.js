const express = require('express');
const app = express();
const router = express.Router();
var http = require('http').createServer(app);
const SocketIO = require('socket.io')
const server = http.listen(3002, () => {
    console.log(`Example app listening at http://localhost:3002`)
})
const io = SocketIO(server)

const data = require("../data");
let oldData = [];

module.exports = async () => {
    io.on('connection', (socket) => {
        console.log("연결 됨")
    });

    setInterval(() => {
        if (oldData.length !== data.get().length) {
            io.emit("newData", true);
        }
        oldData = data.get();
    }, 5000);
}
