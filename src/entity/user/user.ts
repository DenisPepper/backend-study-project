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

    public async setPassword (pass: string) {
        this.pass = await hash(pass, 10);
    }
}
