import express, {Express} from 'express';
import {Server} from 'http';
import {DEFAULT_PORT, ErrorMessage as Message} from "./settings";
import {userRouter} from "./user/user";
import {LoggerService} from "./logger/logger.service";

interface Options {
    port?: number;
    logger?: LoggerService;
}

let instance: Boolean = false;

class App {

    private app: Express;
    private port: number;
    private server: Server;
    private logger: LoggerService;

    constructor() {
        if (instance) {
            throw new Error(Message.OnCreateAnotherAppInstance);
        }
        this.app = express();
        this.setPort();
        this.setLogger(new LoggerService());
        instance = true;
    };

    private setPort(port: number = DEFAULT_PORT) {
        this.port = port;
    }

    private setServer() {
        this.server = this.app.listen(this.port, () => this.logger.info('ok'));
    }

    private setLogger(logger: LoggerService) {
        this.logger = logger;
    }

    private useUserRouter() {
        this.app.use('/user', userRouter);
    }

    public init(options?: Options) {
        if (options) {
            const {port, logger} = options;
            !!port && this.setPort(port);
            !!logger && this.setLogger(logger);
        }
        this.setServer()
        this.useUserRouter();
    }
}

const app = new App();
export default app;
