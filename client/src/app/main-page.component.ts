import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {JwtHelper} from "angular2-jwt";
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
    users: User[] = [];
    forums: Forum[];
    forumId: string;
    private forumInterval: number;
    private userInterval: number;
    checkGetForums: string;
    checkGetUsers: string;
    private jwtHelper: JwtHelper = new JwtHelper();
    private currentUsername = this.jwtHelper.decodeToken(localStorage.getItem('currentUser')).sub;
    private authority = this.jwtHelper.decodeToken(localStorage.getItem('currentUser')).scopes;

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private forumService: ForumService) { 
    }

    ngOnInit() {
        alert(this.jwtHelper.decodeToken(localStorage.getItem('currentUser')).scopes);
            this.forumService.getForums().subscribe(forums => {
                this.forums = forums;
                this.forumInterval = setInterval(() => this.forumService.getForums().subscribe(forums => this.forums = forums, error => {
                    console.log('Error get forums form interval ' + error);
                    return error;
                }), 3500); 
            }, error => {
                console.log('Error get forums ' + error);
                return error;
            });

            this.userService.getUsers().subscribe(users => {
                this.users = users;
                this.userInterval = setInterval(() => this.userService.getUsers().subscribe(users => this.users = users, error => {
                    console.log('Error get users from interval ' + error);
                    return error;
                }), 3500); 
            }, error => {
                console.log('Error get users ' + error);
                return error;
            });    
            /*this.getForums();
            this.getUsers();
            this.forumService.forumAdded$.subscribe(forum => this.forums.push(forum), error => {
                console.log("Error add forum to forums by service " + error);
                return error;
            });
            this.userService.userAdded$.subscribe(user => this.users.push(user), error => {
                console.log("Error add user to users by service " + error);
                return error;
            });*/
    }

    ngOnDestroy() {
        clearInterval(this.forumInterval);
        clearInterval(this.userInterval);
    }

    getUsers() {
        this.userService.getUsers().subscribe(users => this.users = users.sort(),
            error => this.checkGetUsers = 'error get users' + error);
    }

    getForums() {
        this.forumService.getForums().subscribe(forums => this.forums = forums,
            error => this.checkGetForums = 'error get forums' + error);
    }

    onContact(user: User) {
        this.userService.contactUser(user);
    }

    onPass(forum: Forum) {
        this.forumService.componentForum(forum);
    }

    onSearch(value: String) {
        this.router.navigate(['/main-page/search', value]);
    }

    onLoadForumId(username: string) {
        this.forumService.findForumId(username).subscribe(id => {
            this.forumId = id;
            this.router.navigate(['/main-page/direct-message', username, this.forumId]);
        }, error => {
            console.log('Error find forum id ' + error);
            return error;
        });
    }

    onLogOut() {
        localStorage.removeItem('currentUser');
        //this.router.navigate(['/login']);
    }
    onClick() {
        this.router.navigate(['/add-forum']);
    }
}
