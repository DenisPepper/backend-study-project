import {config, DotenvConfigOutput, DotenvParseOutput} from 'dotenv';
import {inject, injectable} from "inversify";
import {AppKey, ErrorMessage} from "../settings";
import {LoggerType} from "../logger/logger.service";

export interface ConfigType {
    get<T extends string | number>(key: string): T;
}

@injectable()
export class Config implements ConfigType {
    private readonly config: DotenvParseOutput;

    constructor(@inject(AppKey.Logger) private logger: LoggerType) {
        const variables:DotenvConfigOutput = config();
        if (variables.error) {
            this.logger.error( `[config] ${ErrorMessage.OnParseEnv}`);
            return;
        }
        this.config = variables.parsed ?? {};
        this.logger.info('[config] parsed');
    }

    get<T extends string | number>(key: string): number | string {
        let env = this.config[key];
        if (typeof T === 'number') {
            return Number(env);
        }
        return env;
    }
}
