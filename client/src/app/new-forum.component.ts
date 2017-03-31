import {Component} from "@angular/core";
import {ForumService} from "./forum.service";

@Component({
    templateUrl: './new-forum.component.html'
})

export class NewForumComponent {
    statusForumCreation: String;
    invalidUsersMessage: String;
    title: string;
    usersNames: string;
    description: string;

    constructor(private forumService: ForumService) {
    }

    onCreate() {
        this.forumService.inviteUsers(this.usersNames)
            .subscribe(usersNames => this.invalidUsersMessage = usersNames, error => this.invalidUsersMessage = error + '');
        this.forumService.createForum(this.title, this.description)
            .subscribe(forum => this.statusForumCreation = '', error => this.statusForumCreation = error + '');
    }

    onTitle(title: string) {
        this.title = title;
    }

    onUsersNames(usersNames: string) {
        this.usersNames = usersNames;
    }

    onDescription(description: string) {
        this.description = description;
    }

}
