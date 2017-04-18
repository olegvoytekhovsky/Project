import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {JwtHelper} from "angular2-jwt";
import {Forum} from "./forum";

@Injectable()
export class ForumService {
    private forumsGetUrl = 'api/get/forums/';
    private forumPostUrl = 'api/add/forum';
    private inviteUsersUrl = 'api/forum/invite/users';
    private token = localStorage.getItem('currentUser');
    private jwtHelper: JwtHelper = new JwtHelper();
    private username = this.jwtHelper.decodeToken(this.token).sub;

    constructor(private http: Http) {
    }

    getForums(): Observable<Forum[]> {
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.forumsGetUrl + this.username, options).map(this.extractData).catch(error => error);
    }

    extractData(res: Response) {
        let body = res.json();
        return body;
    }

    extractStringData(res: Response) {
        let body = res.text();
        return body;
    }

    createForum(title: String, description: String): Observable<Forum> {
        var headers = new Headers({'Authorization': this.token});
        var options = new RequestOptions({headers: headers});

        return this.http.post(this.forumPostUrl, {title, description}, options).map(this.extractData);
    }

    inviteUsers(usersNames: String): Observable<String> {
        var headers = new Headers({'Authorization': this. token});
        var options = new RequestOptions({headers: headers});

        return this.http.post(this.inviteUsersUrl, usersNames, options).map(this.extractStringData);
    }
}
