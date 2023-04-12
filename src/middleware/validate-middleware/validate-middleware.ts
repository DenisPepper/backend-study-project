import {MiddlewareType} from "../../controller/base.controller";
import {NextFunction, Request, Response} from 'express';
import {ClassConstructor, plainToClass} from "class-transformer";
import {validate} from 'class-validator';

export class ValidateMiddleware implements MiddlewareType{
    constructor(private validateTarget: ClassConstructor<object>) {}

    execute(req: Request, res: Response, next: NextFunction) {
        const {body} = req;
        const instance = plainToClass(this.validateTarget, body);
        validate(instance)
            .then((errors) => {
                if(errors.length > 0) {
                   res.status(422).send(errors);
                } else {
                    next();
                }
            });
    }
}
