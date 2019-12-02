const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
var Datastore = require('nedb')
  , db = new Datastore({ filename: './db/user_code', autoload: true });

const configureSSL = require('./configure-ssl.js')

var server = configureSSL(app)

var io = require('socket.io')(server)


app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 8080

// new connection to websocket server
io.on('connection', function (socket) {
  console.log('new connection', socket.id)
  socket.emit('ready', 'test')

  // Finding all planets in the solar system
db.find({}).sort({date: -1}).limit(8).exec(function (err, docs) {
  console.log(docs)
  socket.emit('log history', docs)
});



  socket.on('append', function (msg) {
    console.log('appending', msg)
    db.insert(msg)
    socket.broadcast.emit('append', msg)
  })
})



server.listen(port, () => console.log(`Listening on port ${port}`))
