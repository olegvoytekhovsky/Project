import {Component} from "@angular/core";
import {JwtHelper} from "angular2-jwt";
import {User} from "./user";
import {UserService} from "./user.service";
import {Forum} from "./forum";
import {ForumService} from "./forum.service";

@Component({
    templateUrl: "./admin-panel.component.html",
    providers: [UserService, ForumService]
})

export class AdminPanelComponent {
    private users: User[];
    private forums: Forum[];
    private userInterval: number;
    private forumInterval: number;
    private jwtHelper: JwtHelper = new JwtHelper();
    private username = this.jwtHelper.decodeToken(localStorage.getItem('currentUser')).sub;
    private noButtonUser: string;
    private noButtonForum: number;

    constructor(private userService: UserService, private forumService: ForumService) {}

    ngOnInit() {
        this.userInterval = setInterval(() => {
            this.userService.loadUsers().subscribe(users => this.users = users, error => {
                console.log("Error subscribe users " + error);
                return error;
            });
        }, 5000);
        this.forumInterval = setInterval(() => {
            this.forumService.loadAllForums().subscribe(forums => this.forums = forums, error => {
                console.log('Error load all forums');
                return error;
            });
        }, 5000);
    }

    onDeleteUser(username: string) {
        this.userService.deleteUser(username).subscribe(username => this.noButtonUser = username, error => {
            console.log('Error delete forum' + error);
            return error;
        });   
    }

    onDeleteForum(id: number) {
        this.forumService.deleteForum(id).subscribe(id => this.noButtonForum = id, error => {
            console.log('Error delete forum' + error);
            return error;
        });
    }

    ngOnDestroy() {
        clearInterval(this.userInterval);
        clearInterval(this.forumInterval);
    }
}
