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
    user = new User(1, '');
    messages: Message[];
    id: number;
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
                this.id = params['id'];
                this.getUserMessages(this.userMessagesUrlGet, this.id.toString());
                return this.userService.getUsers()
            })
            .subscribe(users => {
                    for (let index = 0; index < users.length; index++) {
                        if (users[index].id == this.id) {
                            this.user = users[index];
                            break;
                        }
                    }
                }, error => this.checkGetUsers = 'error get users ' + error
            );
    }

    getUserMessages(url: string, id: string) {
        this.messageService.getMessages(url, id)
            .subscribe(messages => this.messages = messages, error => this.checkGetMessages = 'error get user message ' + error);
    }

    onSend(message: String) {
        this.messageService.create(message, this.usersMessageUrlCreate, this.id.toString()).subscribe(message => {
            this.checkSendMessage = '';
            this.messages.push(message);
        }, error => this.checkSendMessage = 'error send message ' + error);
    }
}
