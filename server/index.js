const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const cors = require('cors');
const Router = require('./routes/route');
const workerRouter = require('./routes/worker')
const getDataRouter = require('./routes/getdata')
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use(cors({ credentials: true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//   app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin: http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept-Type');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

console.log(io)
app.set('socketio', io)
io.on("connection", (socket) => {
    console.log("연결됨")
    socket.on("disconnect", () => {
        console.log("연결 끊김1")
    });
});

app.use('/routes', Router)
app.use('/routes', workerRouter)
app.use('/routes', getDataRouter)
// app.use('/routes', socketRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

http.listen(3002, () => {
    console.log(`Example app listening at http://localhost:3002`)
})