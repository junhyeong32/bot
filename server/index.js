const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const cors = require('cors');
const workerRouter = require('./routes/worker');
const getDataRouter = require('./routes/getData');
const socket = require('./routes/socket')


app.use(cors({ credentials: true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

socket()

app.use('/routes', workerRouter)
app.use('/routes', getDataRouter)


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})








    