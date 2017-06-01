import {User} from "./user";

export class Message {
    id: number;
    message: string;
    user: User;

    constructor(message: string) {
        this.message = message;
    }
}
