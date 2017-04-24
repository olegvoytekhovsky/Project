import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Component({
    providers: [AuthenticationService],
    templateUrl: './login-form.component.html'
})

export class LoginFormComponent {
    private username: string;
    private password: string;
    private authenticationMessage: string;
    
    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    onLogin() {
        this.authenticationService.login(this.username, this.password)
        .subscribe(result => {
            if(result == true)
                this.router.navigate(['/main-page']);
            else this.authenticationMessage = "Invalid username or password"; 
        }, error => {
            console.log(error);
                  return error;
        });
    }

    onUsername(username: string) {
       this.username = username;
    }

    onPassword(password: string) {
        this.password = password;
    }
}

