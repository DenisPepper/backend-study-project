import express, {Express} from 'express';
import {Server} from 'http';
import {DEFAULT_PORT, ErrorMessage as Message} from "./settings";
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./controller/user.controller";

interface Options {
    port?: number;
    logger?: LoggerService;
    userController: UserController;
}

let instance: Boolean = false;

class App {

    private app: Express;
    private port: number;
    private server: Server;
    private logger: LoggerService;
    private userController: UserController;

    constructor() {
        if (instance) {
            throw new Error(Message.OnCreateAnotherAppInstance);
        }
        this.app = express();
        this.setPort(DEFAULT_PORT);
        this.setLogger(new LoggerService());
        instance = true;
    };

    private setPort(port: number) {
        this.port = port;
    }

    private setServer() {
        this.server = this.app.listen(this.port, () => this.logger.info('ok'));
    }

    private setLogger(logger: LoggerService) {
        this.logger = logger;
    }

    private setUserController(controller: UserController) {
        this.userController = controller;
    }

    private useRoutes() {
        this.app.use('/user', this.userController.router);
    }

    public init(options: Options) {
        const {port, logger, userController} = options;
        !!port && this.setPort(port);
        !!logger && this.setLogger(logger);
        this.setServer()
        this.setUserController(userController);
        this.useRoutes();
    }
}

const app = new App();
export default app;
