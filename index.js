import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { name } from 'ejs';

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

const users = [];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { name: 'Chayan' });
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
