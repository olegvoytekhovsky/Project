import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Forum} from "./forum";
import {ForumService} from "./forum.service";

@Component({
    providers: [ForumService],
    templateUrl: './forum.component.html'
})

export class ForumComponent implements OnInit {
    forum = new Forum('Test title', 'Test description');
    id: number;
    checkGetForum: string;

    constructor(private route: ActivatedRoute,
                private forumService: ForumService) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                this.id = +params['id'];
                return this.forumService.getForums()
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
}
