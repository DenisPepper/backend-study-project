import {IsEmail, IsString} from "class-validator";

export class UserRegisterDto {
    @IsEmail({}, {message: 'email not valid'})
    email: string;

    @IsString({message: 'password not valid'})
    pass: string;

    @IsString({message: 'user name not valid'})
    name: string;
}
