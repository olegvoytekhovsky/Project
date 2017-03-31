import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {ForumService} from "./forum.service";
import {User} from "./user";
import {Forum} from "./forum";

@Component({
    selector: 'main-page',
    providers: [UserService, ForumService],
    templateUrl: './main-page.component.html'
})

export class MainPageComponent implements OnInit {
    users: User[];
    forums: Forum[];
    checkGetForums: string;
    checkGetUsers: string;

    constructor(private router: Router, private userService: UserService, private forumService: ForumService) {
    }

    ngOnInit() {
        this.getUsers();
        this.getForums();
    }

    getUsers() {
        this.userService.getUsers().subscribe(users => this.users = users,
            error => this.checkGetUsers = 'error get users' + error);
    }

    getForums() {
        this.forumService.getForums().subscribe(forums => this.forums = forums,
            error => this.checkGetForums = 'error get forums' + error);
    }

    onSearch(value: String) {
        this.router.navigate(['/main-page/search', value]);
    }

    onClick() {
        this.router.navigate(['/add-forum']);
    }

}
