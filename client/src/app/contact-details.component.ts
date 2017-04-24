import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {User} from "./user";
import {UserService} from "./user.service";

@Component({
    templateUrl: './contact-details.component.html'
})

export class ContactDetailsComponent {
    user = new User('','');
    username: string;
    
    constructor(private userService: UserService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.userService.loadUser(this.route.snapshot.params['username']).subscribe(user => this.user = user, error => {
            console.log("Error load user " + error);
            return error;
        });
        this.userService.userContacted$.subscribe(user => this.user = user, error => {
            console.log('Error subscribe/pass user by service' + error);
            return error;
        })
    }


}
