import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(path.resolve(), 'public')));
app.use(express.urlencoded({ extended: true }));

const users = [];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { name: 'Chayan' });
});
app.get('/success', (req, res) => {
  res.render('success');
});

app.post('/contact', (req, res) => {
  users.push({ username: req.body.name, email: req.body.email });
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
