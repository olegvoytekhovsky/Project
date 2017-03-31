import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {User} from "./user";

@Injectable()
export class UserService {
    private usersUrl = 'api/get/users';

    constructor(private http: Http) {
    }


    getUsers(): Observable<User[]> {
        return this.http.get(this.usersUrl).map(this.extractData).catch(error => error);
    }

    private extractData(res: Response) {
        var body = res.json();
        return body || {};
    }
}
