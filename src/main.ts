import {App} from './app';
import {UserController} from "./controller/user.controller";
import {LoggerService, LoggerType} from "./logger/logger.service";
import {ExceptionFilter, ExceptionFilterType} from "./error/exception-filter";
import {Container} from "inversify";
import {AppKey} from "./settings";

    export const appContainer = new Container();
    appContainer.bind<LoggerType>(AppKey.Logger).to(LoggerService);
    appContainer.bind<ExceptionFilterType>(AppKey.ExceptionFilter).to(ExceptionFilter);
    appContainer.bind<UserController>(AppKey.UserController).to(UserController);
    appContainer.bind<App>(AppKey.App).to(App);

    export const app = appContainer.get<App>(AppKey.App);
    app.init();
