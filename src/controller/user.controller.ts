import {NextFunction, Request, Response} from 'express';
import {BaseController} from "./base.controller";
import {LoggerType} from "../logger/logger.service";
import {HttpError} from "../error/http-error";
import {inject, injectable} from "inversify";
import 'reflect-metadata';
import {AppKey, ErrorMessage} from "../settings";
import {UserLoginDto} from "../dto/user-login-dto";
import {UserRegisterDto} from "../dto/user-register-dto";
import {UserServiceType} from "../service/user/user";
import {ValidateMiddleware} from "../middleware/validate-middleware/validate-middleware";

export interface UserControllerType {
    login(req: Request, res: Response, next: NextFunction): void,
    register(req: Request, res: Response, next: NextFunction): void
}

@injectable()
export class UserController extends BaseController implements UserControllerType{

    constructor(
        @inject(AppKey.Logger) logger: LoggerType,
        @inject(AppKey.UserService) private service: UserServiceType
    ) {
        super(logger);
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                handler: this.register,
                middlewares: [new ValidateMiddleware(UserRegisterDto)]
            },
            {
                path: '/login',
                method: 'post',
                handler: this.login
            }
        ])
    }

    login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
        console.log(req.body);
        next(new HttpError(401, 'user not found', this.login.name));
    }

    async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
        const {body} = req;
        const user = await this.service.create(body);
        if (!user) {
            return next(new HttpError(422, ErrorMessage["422"]));
        }
        this.ok(res, {...user, pass: undefined});
    }

}
