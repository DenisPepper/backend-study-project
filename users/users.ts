import express from "express";

export const userRouter = express.Router();

userRouter.post('/login', (request, response) => {
    response.send('login');
});

userRouter.post('/register', (request, response) => {
    response.send('register');
});
