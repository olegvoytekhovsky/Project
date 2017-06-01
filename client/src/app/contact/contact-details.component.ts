import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {JwtHelper} from "angular2-jwt";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {ForumService} from "../service/forum.service";

@Component({
    templateUrl: './contact-details.component.html',
})

export class ContactDetailsComponent {
    private user = new User('','');
    private username: string;
    private friend: string;
    private jwtHelper: JwtHelper = new JwtHelper();
    private token = localStorage.getItem('currentUser');
    private currentUsername = this.jwtHelper.decodeToken(this.token).sub; 

    constructor(private userService: UserService, private forumService: ForumService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.userService.loadUser(this.route.snapshot.params['username']).subscribe(user => {
             this.user = user;
             this.userService.isFriend(user.username).subscribe(result => {
                 this.friend = result;
             }, error => {
                console.log('Error check if user is friend ' + error);
                return error;
             });
        }, error => {
            console.log("Error load user " + error);
            return error;
        });
        this.userService.userContacted$.subscribe(user => {
            this.user = user;
            this.userService.isFriend(user.username).subscribe(result => {
                this.friend = result;
            }, error => {
                console.log("Error check if user is friend");
                return error;
            });
        }, error => {
            console.log('Error subscribe/pass user by service' + error);
            return error;
        })
    }

    onDirectMessage(username: string) {
        this.forumService.findForumId(username).subscribe(id => 
            this.router.navigate(['/main-page/direct-message', username, id]), error => {
                console.log('Error find forum by id ' + error);
                return error;
            });        
    }

    onAdd() {
        this.userService.addFriend(this.user.username).subscribe(friend => {
	    this.navigateToFriend(friend.username);
            this.router.navigate(['main-page']);
        }, error => {
            console.log('Error add to friends ' + error);
            return error;
        }) 
    }

    navigateToFriend(username: string) {
       this.forumService.findForumId(username).subscribe(id => {
            this.router.navigate(['/main-page/direct-message', username, id]);
       }, error => {
        console.log('Error load/find forum id ' + error);
        return error;
       }); 
    }
}
