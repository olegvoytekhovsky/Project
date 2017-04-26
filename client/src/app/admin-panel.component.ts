import {Component} from "@angular/core";
import {JwtHelper} from "angular2-jwt";
import {Subscription} from "rxjs/Subscription";
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
    private userSubscription: Subscription;
    private forumSubscription: Subscription;
    private jwtHelper: JwtHelper = new JwtHelper();
    private username = this.jwtHelper.decodeToken(localStorage.getItem('currentUser')).sub;
    private noUser = "";
    private noForum: number;

    constructor(private userService: UserService, private forumService: ForumService) {}

    ngOnInit() {
        this.userService.loadUsers().subscribe(users => {
            this.users = users;
            this.userInterval = setInterval(() => {
                this.userSubscription = this.userService.loadUsers().subscribe(users => this.users = users, error => {
                    console.log("Error load/subscribe users " + error);
                    return error;
                });
            }, 5000);
        }, error => {
            console.log('Error load/subscribe users ' + error)
            return error;
        });
        this.forumService.loadAllForums().subscribe(forums => {
            this.forums = forums;
            this.forumInterval = setInterval(() => {
                this.forumSubscription = this.forumService.loadAllForums().subscribe(forums => this.forums = forums, error => {
                    console.log('Error load/subscribe all forums');
                    return error;
                });
            }, 5000);
        }, error => {
            console.log('Error load/subscribe all forums');
            return error
        });
    }

    onDeleteUser(username: string) {
        this.userService.deleteUser(username).subscribe(username => this.noUser = username, error => {
            console.log('Error delete forum' + error);
            return error;
        });   
    }

    onDeleteForum(id: number) {
        this.forumService.deleteForum(id).subscribe(id => this.noForum = id, error => {
            console.log('Error delete forum' + error);
            return error;
        });
    }

    ngOnDestroy() {
        clearInterval(this.userInterval);
        if(this.userSubscription)
            this.userSubscription.unsubscribe();
        clearInterval(this.forumInterval);
        if(this.forumSubscription)
            this.forumSubscription.unsubscribe();
    }
}
