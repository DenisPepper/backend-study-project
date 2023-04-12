import {hash} from 'bcrypt';

export class User {

    private pass: string;

    constructor(
        private readonly email: string,
        private readonly name: string,
    ) {}

    getEmail() {
        return this.email;
    }

    getName() {
        return this.name;
    }

    getPassword() {
        return this.pass;
    }

    public async setPassword (pass: string, salt: number) {
        this.pass = await hash(pass, salt);
    }
}
