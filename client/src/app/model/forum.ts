export class Forum {
    id: number;
    title: String;
    description: String;
    visibility: string;

    constructor(title: String, description: String) {
        this.title = title;
        this.description = description;
    }
}
