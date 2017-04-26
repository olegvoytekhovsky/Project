import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {User} from "./user";
import {Message} from "./message";
import {ForumService} from "./forum.service";
import {MessageService} from "./message.service";
@Component({
    providers: [ForumService, MessageService],
    templateUrl: './contact.component.html'
})

export class ContactComponent {
    user = new User('1', '');
    messages: Message[];
    username: string;
    interval: any;
    private subscription: Subscription;
    private forumId: string;
    private text: string = '';
    checkSendMessage: string;
    checkGetMessages: string;
    checkGetUsers: string;
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
                                                    }), 3000);
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
/*
    getForumMessages(url: string, forumId: string) {
        this.messageService.getMessages(url, forumId)
            .subscribe(messages => {
                this.messages = messages;
            }, error => this.checkGetMessages = 'error get forum messages ' + error);
    }
/*
    updateForumMessages(url:string, forumId: string) {
        this.messageService.getMessages(url, forumId).subscribe(messages => {
            this.messages = messages;
            for(let message of messages) {
                console.log(message.message);
                if(!this.messages.find(element => element.id == message.id)) {
                    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaif work, not found' + message);
                    this.messages.push(message);
                }
            }
        });
    }
*/
    onSend() {
        this.messageService.create(this.text, this.messageCreateUrl, this.forumId).subscribe(message => {
            this.checkSendMessage = '';
            this.text = '';
        }, error => this.checkSendMessage = 'error send message ' + error);
    }
}
