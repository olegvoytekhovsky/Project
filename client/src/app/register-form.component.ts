import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    templateUrl: './register-form.component.html'
})

export class RegisterFormComponent {

    constructor(private router: Router) {
    }

    goForum() {
        this.router.navigate(['/main-page']);
    }
}
