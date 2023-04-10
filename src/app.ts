import express, {Express} from 'express';
import {Server} from 'http';
import {AppKey, DEFAULT_PORT} from "./settings";
import {LoggerType} from "./logger/logger.service";
import {UserController} from "./controller/user.controller";
import {ExceptionFilterType} from "./error/exception-filter";
import {inject, injectable} from "inversify";
import 'reflect-metadata';

@injectable()
export class App {

    private app: Express;
    private port: number;
    private server: Server;

    constructor(
        @inject(AppKey.Logger) private logger: LoggerType,
        @inject(AppKey.UserController) private userController: UserController,
        @inject(AppKey.ExceptionFilter) private exceptionFilter: ExceptionFilterType,
    ) {
        this.app = express();
        this.setPort(DEFAULT_PORT);
    };

    private setPort(port: number) {
        this.port = port;
    };

    private setServer() {
        this.server = this.app.listen(this.port, () => this.logger.info('ok'));
    };

    private useRoutes() {
        this.app.use('/user', this.userController.router);
    };

    private useErrors() {
        const errorHandler = this.exceptionFilter.catch.bind(this.exceptionFilter)
        this.app.use(errorHandler);
    };

    public init() {
        this.setServer();
        this.useRoutes();
        this.useErrors();
    }
}
