import {injectable} from "inversify";
import 'reflect-metadata';
import {Logger, ILogObj} from 'tslog';
import {LOGGER_TEMPLATE} from "../settings";

export interface LoggerType {
    info(...args: unknown[]): void;
    error(...args: unknown[]): void;
    warn(...args: unknown[]): void;
}

@injectable()
export class LoggerService implements LoggerType {
    private logger: Logger<ILogObj>;

    constructor() {
        this.logger = new Logger({
            prettyLogTemplate: LOGGER_TEMPLATE,
        });
    }

    public info(...args: unknown[]) {
        this.logger.info(...args)
    }

    public error(...args: unknown[]) {
        this.logger.error(...args)
    }

    public warn(...args: unknown[]) {
        this.logger.warn(...args)
    }
}
