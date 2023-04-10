import {NextFunction, Request, Response} from 'express';
import {BaseController} from "./base.controller";
import {LoggerType} from "../logger/logger.service";
import {HttpError} from "../error/http-error";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {AppKey} from "../settings";

export interface UserControllerType {
    login(req: Request, res: Response, next: NextFunction): void,
    register(req: Request, res: Response, next: NextFunction): void
}

@injectable()
export class UserController extends BaseController implements UserControllerType{

    constructor(@inject(AppKey.Logger) logger: LoggerType) {
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
