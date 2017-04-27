import {Component, Output} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "./user.service";
import {User} from "./user";

@Component({
    templateUrl: './search.component.html',
})

export class SearchComponent {
    private user = new User('','');
    private userNo: String;
    private value: string;
    private buttonDisabled = false;
    private userFound: string;
    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.value = params['value'];
            this.findUser();
        });
    }

    findUser() {
        this.userService.findUser(this.value).subscribe(result => {
            this.userNo = '';
            this.user.username = '';
            if(result == this.value + ' not found') {
                this.userFound = '';
                this.userNo = result;
            } else this.userService.loadUser(this.value).subscribe(user => {
                this.user = user;
                this.userService.isFriend(user.username).subscribe(result => {
                    if(result == 'Not found') {
                        this.userFound = result;
                    }
                    else this.userFound = '';
                }, error => {
                    console.log('Error find user in friends ' + error);
                    return error;
                })
            }, error => {
                console.log('Error load user ' + error);
                return error;
            });
        }, error => {
            console.log('Error find user' + error);
            return error;
        });
    }

    onAddFriend() {
       this.userService.addFriend(this.value).subscribe(result => {
            this.userService.addUser(result);
            this.router.navigate(['main-page']);
            this.buttonDisabled = true;
       }, error => {
        console.log('Error add to friend' + error);
        return error;
       }); 
    }
}
