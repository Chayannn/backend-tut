import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(path.resolve(), 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { name: 'Chayan' });
});

app.listen(3000, () => {
  console.log('Sever is running');
});
