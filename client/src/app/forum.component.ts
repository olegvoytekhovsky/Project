import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Forum} from "./forum";
import {Message} from "./message";
import {ForumService} from "./forum.service";
import {MessageService} from "./message.service";

@Component({
    providers: [MessageService],
    templateUrl: './forum.component.html'
})

export class ForumComponent implements OnInit {
    private forum = new Forum('', '');
    private startMessage: string;
    private messages: Message[];
    private checkSendMessage: string;
    private checkGetMessages: string;
    private id: string;
    private interval: number;
    private subscription: Subscription;
    private checkGetForum: string;
    private messageCreateUrl = 'api/save/forum/message/'; 
    private messagesGetUrl = 'api/get/forum/message/';
    
    constructor(private route: ActivatedRoute,
                private forumService: ForumService,
                private messageService: MessageService ) {
    }

    ngOnInit() {
       /* this.forumService.getForums().subscribe(forums => {
            if(forums.length == 0)
                this.startMessage = 'You can add friends or create forums';
            else {
                this.forum = forums[0];
                this.id = this.forum.id.toString();
                this.getMessages(this.messageGetUrl, this.id);
            }
        }, error => {
            console.log('Error get forums ' + error);
            return error;
        });*/
        this.route.params
            .forEach((params: Params) => {
                if(params['id']) {
                    this.id = params['id'];
                    if(this.interval) {
                        clearInterval(this.interval);
                        this.messages = [];
                    }
                    if(this.subscription)
                        this.subscription.unsubscribe();
                    this.messageService.getMessages(this.messagesGetUrl, this.id)
                    .subscribe(messages => {
                        this.messages = messages;
                        this.interval = setInterval(() => this.subscription = this.messageService.getMessages(this.messagesGetUrl, this.id)
                        .subscribe(messagesInner => {
                            this.messages = messagesInner;
                        }, error => {
                            console.log('Error get inner messages ' + error);
                            return error;
                        }), 2000);
                    }, error => {
                            console.log('Error get forum messages ' + error);
                            return error;
                    }); 
                }
            });
            this.getForums();
            this.forumService.forumComponented.subscribe(forum => this.forum = forum, error => {
                console.log('Error subscribe/pass forum ' + error);
                return error;
            });

    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    private getForums() {
        this.forumService.getForums().subscribe(forums => {
            if(forums.length == 0)
                this.startMessage = 'You can add friends or create forums';
            else if(!this.id) {
                this.forum = forums[0];
                this.id = this.forum.id.toString();
                this.messageService.getMessages(this.messagesGetUrl, this.forum.id.toString())
                .subscribe(messages => {
                    this.messages = messages;
                    this.interval = setInterval(() => this.subscription = this.messageService
                                               .getMessages(this.messagesGetUrl, this.forum.id.toString())
                                               .subscribe(messagesInner => this.messages = messagesInner, error => {
                                                    console.log('Error get start inner forum messages ' + error);
                                                    return error;
                                               }), 2000);
                }, error => {
                    console.log('Error get start foum messages ' + error);
                    return error;
                });
            }
            else {
                let id = +this.id;
                this.forum = forums.find(element => element.id == id);
            }
        }, error => {
            console.log('Error get forums ' + error);
            return error;
        });
    }

    private getMessages(url: string, id: string) {
            this.messageService.getMessages(url, id)
                .subscribe(messages => this.messages = messages, error => this.checkGetMessages = 'error get forum message ' + error);
        }

    private onSend(message: string) {
        this.messageService.create(message, this.messageCreateUrl, this.id)
            .subscribe(message => {
                this.checkSendMessage = '';
            }, error => this.checkSendMessage = 'error send message ' + error);
    }
}
