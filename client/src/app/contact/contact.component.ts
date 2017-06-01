import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {User} from "../model/user";
import {Message} from "../model/message";
import {ForumService} from "../service/forum.service";
import {MessageService} from "../service/message.service";
@Component({
    providers: [ForumService, MessageService],
    templateUrl: './contact.component.html'
})

export class ContactComponent {
    private user = new User('1', '');
    private messages: Message[];
    private username: string;
    private interval: any;
    private subscription: Subscription;
    private forumId: string;
    private text: string = '';
    private checkSendMessage: string;
    private checkGetMessages: string;
    private checkGetUsers: string;
    private userMessagesUrlGet = 'api/get/user/message/';
    private messageCreateUrl = 'api/save/forum/message/'; 
    private messagesGetUrl = 'api/get/forum/message/';

    constructor(private route: ActivatedRoute, private forumService: ForumService, private messageService: MessageService) {
    }

    ngOnInit() {
        let count = 0;
        this.route.params
            .forEach((params: Params) => {
                if(this.interval) {
                    clearInterval(this.interval);
                    this.messages = [];
                }
                if(this.subscription) {
                    this.subscription.unsubscribe();
                    this.messages = [];
                }
                this.messageService.getMessages(this.messagesGetUrl, params['id'])
                .subscribe(messages => {
                        this.messages = messages;
                        this.interval = setInterval(() => this.subscription = this.messageService.getMessages(this.messagesGetUrl, params['id'])
                                                    .subscribe(messages => {
                                                        this.messages = messages;          
                                                    }), 2000);
                }, error => {
                   console.log(error);
                   return error;
                });
                this.username = params['username'];
                this.forumId = params['id'];
            });
    }

    ngOnDestroy() {
        clearInterval(this.interval);
        if(this.subscription)
            this.subscription.unsubscribe();
    }

    findForumId(username: string) {
        this.forumService.findForumId(username).subscribe(id => this.forumId = id, error => {
            console.log(error);
            return error;
        });
    }

    onSend() {
        this.messageService.create(this.text, this.messageCreateUrl, this.forumId).subscribe(message => {
            this.checkSendMessage = '';
            this.text = '';
        }, error => this.checkSendMessage = 'error send message ' + error);
    }
}
