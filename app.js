require("dotenv").config();
// Dependecies
const express = require('express');
const app = express();
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const server = require('http').Server(app);
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const io = require('socket.io')(server);
const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);
  
 //Express Instance 

// var messages = [{ id: 1, text: "Hola tu", author: "yombi" },];

// io.on('connection', function(socket) {
//   console.log('Alguien se ha conectado con Sockets');
//   socket.emit('messages', messages);

//   socket.on('new-message', (data)=>{
//       messages.push(data);

//       io.sockets.emit('messages',messages);
//   });
// });

//ROUTES

const admin = require('./routes/user/admin');
const doctor = require('./routes/user/doctor');
const authRoutes = require('./routes/authRoute');
const router = require('./routes/index');

//Mongoose

mongoose.Promise = Promise;

mongoose
  .connect(
    `mongodb+srv://Admin:${process.env.PWDB}@cluster0-b3btc.mongodb.net/neurogram `,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// CORS
const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
  credentials: true
};

//Middelware Setup

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.options('*', cors(corsOptions))
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(cookieParser());
app.use(session({
  secret: 'neurogram-secret',
  cookie: {maxAge: 60000},
  store: new MongoStore({
    mongooseConnection : mongoose.connection,
    ttl: 24 * 60 * 60
  })
 })
);

//Main routes

app.use('/', authRoutes);
app.use('/', router);
app.use('/doctor', doctor);
// app.use('/admin', admin);

server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

