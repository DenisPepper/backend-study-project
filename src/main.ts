import app from './app';
import {UserController} from "./controller/user.controller";
import {LoggerService} from "./logger/logger.service";
import {ExceptionFilter} from "./error/exception-filter";



const run = async () => {
    const logger = new LoggerService();
    await app.init({
        logger,
        userController: new UserController(logger),
        exceptionFilter: new ExceptionFilter(logger),
    });
};

run().then();
