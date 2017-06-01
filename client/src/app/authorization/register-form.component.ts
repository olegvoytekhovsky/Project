import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../model/user";
import {UserService} from "../service/user.service";

@Component({
    providers: [UserService],
    templateUrl: './register-form.component.html'
})

export class RegisterFormComponent {
    private firstname: string = '';
    private lastname: string = '';
    private username: string = '';
    private password: string = '';
    private confirmPassword: string = '';
    private userStatus: String;
    private success: string = '';
    private error: string = '';
    private errorPassword: string = '';
    private errorPost: any;

    constructor(private router: Router, private userService: UserService) {
    }
   
    onRegister() {
        this.success = '';
        this.error = '';
        this.errorPassword ='';
        if(this.password.length > 0 && this.firstname.length > 0 && this.lastname.length > 0 && this.username.length > 0) {
            if(this.confirmPassword == this.password) {
                this.userService.createUser(this.username, this.password, this.firstname, this.lastname).subscribe(result => {
                    this.userStatus = result;
                    if(this.userStatus == 'Busy') {
                        this.error = 'Username already exists';
                    } 
                    else if(this.userStatus == 'Character in not supported') {
                        this.error = 'Password characters is not supported';
                    }
                    else {
                        this.success = 'A user account was created. Please, log in';
                        this.firstname = '';
                        this.lastname = '';
                        this.username = '';
                        this.password = '';
                        this.confirmPassword = '';
                    }
                    return result;
                },
                error => {
                    this.errorPost = error;
                    console.log(error);
                    return error;
                });
            } else this.errorPassword = 'Password does not match the confirm password';
        }
    }
}
