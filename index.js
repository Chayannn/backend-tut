import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { name } from 'ejs';
import cookieParser from 'cookie-parser';

mongoose
  .connect('mongodb://127.0.0.1:27017', {
    dbName: 'Backend',
  })
  .then(() => console.log('Database connected'))
  .catch((e) => console.log(e));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Message = mongoose.model('Message', messageSchema);

const app = express();

app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const users = [];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    res.render('logout');
  } else {
    res.render('login');
  }
});

app.post('/login', (req, res) => {
  res.cookie('token', 'iamin', {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });

  res.redirect('/');
});

app.get('/logout', (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
  });

  res.redirect('/');
});

app.get('/add', async (req, res) => {
  await Message.create({
    name: 'Chayan',
    email: 'Chayanp188@gmail.com',
  }).then(() => {
    res.send('Nice');
  });
});

app.get('/success', (req, res) => {
  res.render('success');
});

app.post('/contact', async (req, res) => {
  const { name, email } = req.body;
  await Message.create({ name: name, email: email });

  res.redirect('/success');
});

app.get('/users', (req, res) => {
  res.json({
    users,
  });
});

app.listen(3000, () => {
  console.log('Sever is running');
});
