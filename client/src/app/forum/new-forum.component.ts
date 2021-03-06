import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Forum} from "../model/forum";
import {ForumService} from "../service/forum.service";

@Component({
    templateUrl: './new-forum.component.html'
})

export class NewForumComponent {
    private statusForumCreation: String;
    private invalidUsersMessage: String;
    private title: string;
    private usernames: string;
    private description: string;
    private forum: Forum;

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
                           this.title = '';
                           this.usernames = '';
                           this.description = '';
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
}
