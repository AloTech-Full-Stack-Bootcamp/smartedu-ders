const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const authRoute = require('./routes/authRoute');

const app = express();
const mongoUrl = "mongodb://localhost/smartedu-db-ders";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })



app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: mongoUrl })
}))

global.userIn = null;

app.use('*', (req, res, next)=> {
  userIn = req.session.userId; 
  next();
});

app.use('/', pageRoute);
app.use('/course', courseRoute);
app.use('/category', categoryRoute);
app.use('/auth', authRoute);


const port = 5000;

app.listen(port, () => {
  console.log('Uygulama baslatildi.');
});