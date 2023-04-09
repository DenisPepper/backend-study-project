import {NextFunction, Request, Response} from "express";
import {LoggerService} from "../logger/logger.service";
import {HttpError} from "./http-error";

interface ExceptionFilterType {
    catch(error: Error, req: Request, res: Response, next: NextFunction): void;
}

export class ExceptionFilter implements ExceptionFilterType {

    private logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
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
