export const ErrorMessage = {
    OnCreateAnotherAppInstance: 'instance of app is already exist',
    422: 'Пользователь с такими учетными данными уже существует',
} as const;

export const DEFAULT_PORT = 9090;

export const LOGGER_TEMPLATE = "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}\t\n{{filePathWithLine}}{{name}}\t";

export const AppKey = {
    App: Symbol('App'),
    Logger: Symbol('Logger'),
    UserController: Symbol('UserController'),
    UserService: Symbol('UserService'),
    ExceptionFilter: Symbol('ExceptionFilter'),
} as const;
