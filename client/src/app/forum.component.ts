import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Forum} from "./forum";
import {Message} from "./message";
import {ForumService} from "./forum.service";
import {MessageService} from "./message.service";

@Component({
    providers: [ForumService, MessageService],
    templateUrl: './forum.component.html'
})

export class ForumComponent implements OnInit {
    private forum = new Forum('Test title', 'Test description');
    private messages: Message[];
    private checkSendMessage: string;
    private checkGetMessages: string;
    private id: number;
    private checkGetForum: string;
    private messageCreateUrl = 'api/save/forum/message/'; 
    private messageGetUrl = 'api/get/forum/message/';
    
    constructor(private route: ActivatedRoute,
                private forumService: ForumService,
                private messageService: MessageService ) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                this.id = +params['id'];
                this.getMessages(this.messageGetUrl, this.id.toString());
                return this.forumService.getForums();
            })
            .subscribe(forums => {
                    for (let index = 0; index < forums.length; index++) {
                        if (forums[index].id == this.id) {
                            this.forum = forums[index];
                            break;
                        }
                    }
                }, error => this.checkGetForum = 'forum error title' + error
            );
    }

    private getMessages(url: string, id: string) {
            this.messageService.getMessages(url, id)
                .subscribe(messages => this.messages = messages, error => this.checkGetMessages = 'error get forum message ' + error);
        }

    private onSend(message: string) {
        this.messageService.create(message, this.messageCreateUrl, this.id.toString())
            .subscribe(message => {
                this.checkSendMessage = '';
                this.messages.push(message);
            }, error => this.checkSendMessage = 'error send message ' + error);
    }
}
