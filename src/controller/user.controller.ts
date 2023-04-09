import {NextFunction, Request, Response, Router} from 'express';
import {BaseController} from "./base.controller";
import {LoggerService} from "../logger/logger.service";

export class UserController extends BaseController {

    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                handler: this.register
            },
            {
                path: '/login',
                method: 'post',
                handler: this.login
            }
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'login');
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }

}
