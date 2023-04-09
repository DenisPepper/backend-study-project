import app from './app';
import {UserController} from "./controller/user.controller";
import {LoggerService} from "./logger/logger.service";

const logger = new LoggerService();

app.init({
    logger,
    userController: new UserController(logger),
});
