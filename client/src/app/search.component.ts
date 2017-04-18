import {Component} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "./user.service";
import {User} from "./user";

@Component({
    templateUrl: './search.component.html',
    providers: [UserService]
})

export class SearchComponent {
    user = new User('','');
    userNo: String;
    value: string;

    constructor(private userService: UserService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.value = params['value'];
        });
        this.findUser();
    }

    findUser() {
        this.userService.findUser(this.value).subscribe(result => {
            alert(typeof result);
            if(result == 'User not found') {
                this.userNo = result;
            } else this.userService.loadUser(this.value).subscribe(user => {
                this.user = user;
            }, error => {
                console.log('Error load user ' + error);
                return error;
            });
        }, error => {
            console.log('Error find user' + error);
            return error;
        });
    }
}
