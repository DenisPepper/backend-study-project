import {Logger, ILogObj} from 'tslog';
import {LOGGER_TEMPLATE} from "../settings";

export class LoggerService {
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
