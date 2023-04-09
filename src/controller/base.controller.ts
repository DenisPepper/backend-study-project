import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response, Router} from 'express';

interface RoutType {
    path: string;
    handler(req: Request, res: Response, next: NextFunction): void;
    method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
}

export abstract class BaseController {
    readonly router: Router;
    private logger: LoggerService

    constructor(logger: LoggerService) {
        this.router = Router();
        this.logger = logger;
    };

    public getRouter() {
        return this.router;
    };

    public created(res: Response) {
        return res.sendStatus(201);
    };

    public send<M>(res: Response, code: number, message: M) {
        res.type('application/json');
        return res.status(200).json(message);
    };

    public ok<M>(res: Response, message: M) {
        return this.send<M>(res, 200, message);
    };

    protected bindRoutes(routes: RoutType[]) {
        routes.forEach((route) => {
            this.logger.info(`[${route.method}] ${route.path}`);
            const handler = route.handler.bind(this);
            this.router[route.method](route.path, handler);
        });
    };


}

