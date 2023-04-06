import express from 'express';
import {userRouter} from "./users/users.js";

const PORT = 9090;
const app = express();

app.use((request, response, next) => {
  next();
});

app.use('/user', userRouter);

app.get('/', (request, response) => {
  response.send('OK');
});

app.use((error, request, response, next) => {

});

app.listen(PORT);
