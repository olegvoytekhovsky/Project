import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Forum} from "../model/forum";
import {User} from "../model/user";
import {Message} from "../model/message";
import {ForumService} from "../service/forum.service";
import {UserService} from "../service/user.service";
import {MessageService} from "../service/message.service";

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
    private text: string = '';
    private forumsPresent = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private forumService: ForumService,
                private userService: UserService,
                private messageService: MessageService ) {
    }

    ngOnInit() {
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
        if(this.subscription)
            this.subscription.unsubscribe();
    }

    private getForums() {
        this.forumService.getForums().subscribe(forums => {
            if(forums.length == 0) {
                this.userService.loadFriends().subscribe(users => {
                    if(users.length > 0) {
                        this.onLoadForumId(users[0].username);
                    } else this.startMessage = 'You can add friends or create forums';
                }, error => {
                    console.log('Error load friends ' + error);
                    return error;
                });
            }
            else if(!this.id) {
                this.forumsPresent = true;
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
                this.forumsPresent = true;
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

    private onSend() {
        this.messageService.create(this.text, this.messageCreateUrl, this.id)
            .subscribe(message => {
                this.text = '';
                this.checkSendMessage = '';
            }, error => this.checkSendMessage = 'error send message ' + error);
    }

    private onLoadForumId(username: string) {
       this.forumService.findForumId(username).subscribe(id => {
           this.router.navigate(['/main-page/direct-message', username, id]); 
       }, error => {
            console.log('Error get forum id' + error);
            return error;
       }); 
    }
}
