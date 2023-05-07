import express from 'express';
import path from 'path';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(), 'public'));

app.get('/', (req, res) => {
  const pathlocation = path.resolve();
  res.render('index', { name: 'gar marche' });
});

app.listen(3000, () => {
  console.log('Sever is running');
});
