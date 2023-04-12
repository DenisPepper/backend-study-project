import {LoggerType} from "../logger/logger.service";
import {NextFunction, Request, Response, Router} from 'express';
import {injectable} from "inversify";
import 'reflect-metadata';

export interface MiddlewareType {
    execute(req: Request, res: Response, next: NextFunction): void;
}

interface RoutType {
    path: string;
    handler(req: Request, res: Response, next: NextFunction): void;
    method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
    middlewares?: MiddlewareType[];
}

@injectable()
export abstract class BaseController {
    readonly router: Router;
    protected logger: LoggerType;

    public constructor(logger: LoggerType) {
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
            const middlewares = route.middlewares?.map((m) => m.execute.bind(m));
            const handler = route.handler.bind(this);
            const pipeline = middlewares ? [...middlewares, handler] : handler;
            this.router[route.method](route.path, pipeline);
        });
    };


}

