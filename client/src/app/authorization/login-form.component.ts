import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";

@Component({
    providers: [AuthenticationService],
    templateUrl: './login-form.component.html'
})

export class LoginFormComponent {
    private username: string = '';
    private password: string = '';
    private error: string = '';
    
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    onLogin() {
        this.error = '';
        this.authenticationService.login(this.username, this.password)
        .subscribe(result => {
            if(result == true) {
                this.router.navigate(['/main-page']); 
            } 
        }, error => {
            this.error = this.authenticationService.error401;
            console.log('Error log in ' + error);
                return error;
        });
    }
}

