import {UserRegisterDto} from "../../dto/user-register-dto";
import {UserLoginDto} from "../../dto/user-login-dto";
import {User} from "../../entity/user/user";
import {inject, injectable} from "inversify";
import {AppKey} from "../../settings";
import {ConfigType} from "../../config/config";

export interface UserServiceType {
    create(dto: UserRegisterDto): Promise<User | null>;

    validate(dto: UserLoginDto): Promise<boolean>;
}

@injectable()
export class UserService implements UserServiceType {
    constructor(@inject (AppKey.Config) private config: ConfigType) {
    }

    async create(dto: UserRegisterDto): Promise<User | null> {
        const {email, name, pass} = dto;
        const user = new User(email, name);
        await user.setPassword(pass, this.config.get<number>('SALT'));
        //проверяем, что в БД нет пользователя с таким именем и e-mail
        // если есть => null, если нет => пишем пользователя в базу и возвращаем пользователя
        return null;
    }

    async validate(dto: UserLoginDto): Promise<boolean> {
        return false;
    }
}
