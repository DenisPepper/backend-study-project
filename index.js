import express from 'express';

const PORT = 9090;

const app = express();

app.get('/test', (request, response) => {
  response.send('<h1>OK</h1>');
});

app.listen(PORT);
