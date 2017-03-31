import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    templateUrl: './login-form.component.html'
})

export class LoginFormComponent {
    router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    goForum() {
        this.router.navigate(['/main-page']);
    }
}

