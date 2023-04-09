import {NextFunction, Request, Response} from 'express';
import {BaseController} from "./base.controller";
import {LoggerService} from "../logger/logger.service";
import {HttpError} from "../error/http-error";

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
        next(new HttpError(401, 'user not found', this.login.name));
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register');
    }

}
