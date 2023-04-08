import express, {Express} from 'express';
import {Server} from 'http';
import {DEFAULT_PORT, ErrorMessage as Message} from "./settings";
import {userRouter} from "./user/user";

interface Options {
    port?: number;
    logger?: unknown;
}

let instance:Boolean = false;

class App {

    private app: Express;
    private port: number;
    private server: Server;

    constructor() {
        if (instance) {
            throw new Error(Message.OnCreateAnotherAppInstance);
        }
        this.app = express();
        this.port = DEFAULT_PORT;
        instance = true;
    };

    private useUserRouter() {
        this.app.use('/user', userRouter);
    }

     public init(options?: Options) {
        const {port, logger} = options;

        port && (this.port = port);

        this.server = this.app.listen(this.port, () => console.log('ok'));

        this.useUserRouter();
    }
}

const app = new App();
export default app;
