import express from 'express';
import {userRouter} from "./users/users.js";

const PORT = 9090;
const app = express();

app.use('/user', userRouter);

app.get('/', (request, response) => {
  response.send('OK');
});

app.listen(PORT);
