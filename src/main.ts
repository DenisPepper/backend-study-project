import {App} from './app';
import {UserController, UserControllerType} from "./controller/user.controller";
import {LoggerService, LoggerType} from "./logger/logger.service";
import {ExceptionFilter, ExceptionFilterType} from "./error/exception-filter";
import {Container, ContainerModule} from "inversify";
import {AppKey} from "./settings";

const appModule = new ContainerModule((bind) => {
    bind<LoggerType>(AppKey.Logger).to(LoggerService);
    bind<ExceptionFilterType>(AppKey.ExceptionFilter).to(ExceptionFilter);
    bind<UserControllerType>(AppKey.UserController).to(UserController);
    bind<App>(AppKey.App).to(App);
});

export const appContainer = new Container();
appContainer.load(appModule);

export const app = appContainer.get<App>(AppKey.App);
app.init();



