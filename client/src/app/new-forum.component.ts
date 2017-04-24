import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Forum} from "./forum";
import {ForumService} from "./forum.service";

@Component({
    templateUrl: './new-forum.component.html'
})

export class NewForumComponent {
    statusForumCreation: String;
    invalidUsersMessage: String;
    title: string;
    usernames: string;
    description: string;
    forum: Forum;

    constructor(private forumService: ForumService, private router: Router) {
    }

    onCreate() {
        this.invalidUsersMessage = '';
        this.forumService.inviteUsers(this.usernames)
            .subscribe(usernames => {
                if(usernames == '')
                    this.forumService.createForum(this.title, this.description)
                        .subscribe(forum => {
                           this.statusForumCreation = '';
                           this.forumService.addForum(forum);
                       }, error => {
                           this.statusForumCreation = error + '';
                           console.log('Error create forum ' + error);
                           return error;
                       });
                else this.invalidUsersMessage = usernames;       
            }, error => {
                console.log('Error invite users ' + error);
                this.invalidUsersMessage = error + '';
                return error;
            });
    }

    onTitle(title: string) {
        this.title = title;
    }

    onUsersNames(usernames: string) {
        this.usernames = usernames;
    }

    onDescription(description: string) {
        this.description = description;
    }

}
