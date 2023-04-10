import {NextFunction, Request, Response} from "express";
import {LoggerType} from "../logger/logger.service";
import {HttpError} from "./http-error";
import {injectable, inject} from "inversify";
import 'reflect-metadata';
import {AppKey} from "../settings";

export interface ExceptionFilterType {
    catch(error: Error, req: Request, res: Response, next: NextFunction): void;
}

@injectable()
export class ExceptionFilter implements ExceptionFilterType {

    constructor(@inject(AppKey.Logger) private logger: LoggerType) {
    }

    catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction) {
        if (error instanceof HttpError) {
            this.logger.error(`[${error.context}] status: ${error.statusCode}: ${error.message}`);
            res.status(error.statusCode).send({error: error.message});
        } else {
            this.logger.error(error.message);
            res.status(500).send({error: error.message});
        }
    };
}
