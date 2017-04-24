import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "./user";
import {UserService} from "./user.service";

@Component({
    providers: [UserService],
    templateUrl: './register-form.component.html'
})

export class RegisterFormComponent {
    firstname: string = '';
    lastname: string = '';
    username: string = '';
    password: string = '';
    confirmPassword: string = '';
    userStatus: String;
    success: string = '';
    error: string = '';
    errorPassword: string = '';
    errorPost: any;

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
                    } else this.success = 'A user account was created. Please, log in';
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

    onFirstname(firstname: string) {
        this.firstname = firstname;
    }

    onLastname(lastname: string) {
        this.lastname = lastname;
    }

    onUsername(username: string) {
        this.username = username;
    }

    onPassword(password: string) {
        this.password = password;
    }

    onConfirmPassword(confirmPassword: string) {
        this.confirmPassword = confirmPassword;
    }
    goForum() { 
        this.router.navigate(['/main-page']);
    }
}
