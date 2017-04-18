import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {JwtHelper} from "angular2-jwt";
import {User} from "./user";

@Injectable()
export class UserService {
    private usersUrl = 'api/get/friends/';
    private userLoadUrl = 'api/load/user/';
    private userFindUrl = 'api/find/user/';
    private userCreateUrl = 'api/create/user';
    private jwtHelper: JwtHelper = new JwtHelper();
    private token = localStorage.getItem('currentUser');

    constructor(private http: Http) {
    }

    createUser(username: string, password: string): Observable<String> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options =  new RequestOptions({headers: headers});
        return this.http.post(this.userCreateUrl, {username, password}, options).map(this.extractStringData)
        .catch(error => {
            console.log(error);
            return error;
        });
    }

    getUsers(): Observable<User[]> {
        let username = this.jwtHelper.decodeToken(this.token).sub;
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers}); 
        return this.http.get(this.usersUrl + username, options).map(this.extractData)
        .catch(error => {
            console.log(error);
            return error;
        });
    }

    loadUser(username: string): Observable<User> {
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.userLoadUrl + username, options).map(this.extractData)
        .catch(error => {
            console.log(error);
            return error;
       }); 
    }

    findUser(username: string): Observable<String> {
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.userFindUrl + username, options).map(this.extractStringData)
        .catch(error => {
            console.log(error);
            return error;
        });
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private extractStringData(res: Response) {
        let body = res.text();
        return body;
    }
}
