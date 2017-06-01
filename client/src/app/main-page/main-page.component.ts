import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {JwtHelper} from "angular2-jwt";
import {UserService} from "../service/user.service";
import {ForumService} from "../service/forum.service";
import {User} from "../model/user";
import {Forum} from "../model/forum";

@Component({
    selector: 'main-page',
    providers: [UserService, ForumService],
    templateUrl: './main-page.component.html'
})

export class MainPageComponent implements OnInit {
    private users: User[] = [];
    private forums: Forum[];
    private forumId: string;
    private usernameSearch: string ='';
    private forumInterval: number;
    private userInterval: number;
    private userSubscription: Subscription;
    private forumSubscription: Subscription;
    private checkGetForums: string;
    private checkLoadFriends: string;
    private jwtHelper: JwtHelper = new JwtHelper();
    private currentUsername = this.jwtHelper.decodeToken(localStorage.getItem('currentUser')).sub;
    private authority = this.jwtHelper.decodeToken(localStorage.getItem('currentUser')).scopes;

    constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private forumService: ForumService) { 
    }

    ngOnInit() {
            this.forumService.getForums().subscribe(forums => {
                this.forums = forums;
                this.forumInterval = setInterval(() => this.forumSubscription = this.forumService.getForums().subscribe(forums => this.forums = forums, error => {
                    console.log('Error get forums form interval ' + error);
                    return error;
                }), 5000); 
            }, error => {
                console.log('Error get forums ' + error);
                return error;
            });

            this.userService.loadFriends().subscribe(users => {
                this.users = users;
                this.userInterval = setInterval(() => this.userSubscription = this.userService.loadFriends().subscribe(users => this.users = users, error => {
                    console.log('Error load friends from interval ' + error);
                    return error;
                }), 5000); 
            }, error => {
                console.log('Error load friends ' + error);
                return error;
            });    
}

    ngOnDestroy() {
        clearInterval(this.forumInterval);
        if(this.forumSubscription)
            this.forumSubscription.unsubscribe();
        clearInterval(this.userInterval);
        if(this.userSubscription)
            this.userSubscription.unsubscribe();
    }

    getUsers() {
        this.userService.loadFriends().subscribe(users => this.users = users.sort(),
            error => this.checkLoadFriends = 'error load friends' + error);
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

    onSearch() {
        if(this.usernameSearch)
            this.router.navigate(['/main-page/search', this.usernameSearch]);
        this.usernameSearch = '';
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
    }
    onClick() {
        this.router.navigate(['/add-forum']);
    }
}
