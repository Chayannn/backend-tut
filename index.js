// import http from 'http';
// import { generateLovePercent } from './features.js';
// import fs from 'fs';

// const home = fs.readFileSync('./index.html');

// const server = http.createServer((req, res) => {
//   if (req.url === '/about') {
//     res.end(`<h1>Love is ${generateLovePercent()}</h1>`);
//   } else if (req.url === '/') {
//     res.end(home);
//   } else if (req.url === '/contact') {
//     res.end('<h1>Contact Page</h1>');
//   } else {
//     res.end('<h1>Page not found</h1>');
//   }
// });

// server.listen(3000, () => {
//   console.log('Server is working');
// });
import express from 'express';
import fs from 'fs';

const app = express();

app.get('/', (req, res) => {
  const file = fs.readFileSync('./index.html');
  res.sendFile(file);
});

app.listen(3000, () => {
  console.log('Sever is running');
});
