import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {User} from "./user";
import {Message} from "./message";
import {UserService} from "./user.service";
import {MessageService} from "./message.service";
@Component({
    providers: [UserService, MessageService],
    templateUrl: './contact.component.html'
})

export class ContactComponent implements OnInit {
    user = new User('1', '');
    messages: Message[];
    username: string;
    checkSendMessage: string;
    checkGetMessages: string;
    checkGetUsers: string;
    private userMessagesUrlGet = 'api/get/user/message/';
    private usersMessageUrlCreate = 'api/save/user/message/';

    constructor(private route: ActivatedRoute,
                private userService: UserService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                this.username = params['username'];
                this.getUserMessages(this.userMessagesUrlGet, this.username.toString());
                return this.userService.getUsers();
            })
            .subscribe(users => {
                    for (let index = 0; index < users.length; index++) {
                        if (users[index].username == this.username) {
                            this.user = users[index];
                            break;
                        }
                    }
                }, error => this.checkGetUsers = 'error get users ' + error
            );
    }

    getUserMessages(url: string, username: string) {
        this.messageService.getMessages(url, username)
            .subscribe(messages => this.messages = messages, error => this.checkGetMessages = 'error get user message ' + error);
    }

    onSend(message: String) {
        this.messageService.create(message, this.usersMessageUrlCreate, this.username.toString()).subscribe(message => {
            this.checkSendMessage = '';
            this.messages.push(message);
        }, error => this.checkSendMessage = 'error send message ' + error);
    }
}
