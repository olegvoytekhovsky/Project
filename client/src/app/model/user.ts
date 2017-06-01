export class User {
    username: string;
    password: string;
    firstname: string;
    lastname: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}
