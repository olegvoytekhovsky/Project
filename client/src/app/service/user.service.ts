import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {JwtHelper} from "angular2-jwt";
import {User} from "../model/user";

@Injectable()
export class UserService {
    private friendsUrl = 'api/load/friends/';
    private usersLoadUrl = 'api/load/users';
    private userLoadUrl = 'api/load/user/';
    private userFindUrl = 'api/find/user/';
    private userCreateUrl = 'api/create/user';
    private userIsFriendUrl = 'api/is/friend/';
    private userAddFriendUrl = 'api/add/friend/';
    private userDeleteUrl = 'api/delete/user/';
    private jwtHelper: JwtHelper = new JwtHelper();
    private token = localStorage.getItem('currentUser');
    private userAddedSource = new Subject<User>();
    private userContactedSource = new Subject<User>();
    userAdded$ = this.userAddedSource.asObservable(); 
    userContacted$ = this.userContactedSource.asObservable();

    constructor(private http: Http) {
    }

    contactUser(user: User) {
        this.userContactedSource.next(user);
    }

    addUser(user: User) {
        this.userAddedSource.next(user);
    }
    createUser(username: string, password: string, firstname: string, lastname: string): Observable<String> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options =  new RequestOptions({headers: headers});
        return this.http.post(this.userCreateUrl, {username, password, firstname, lastname}, options).map(this.extractStringData)
        .catch(error => {
            console.log('Error post request - createUser ' + error);
            return error;
        });
    }

    loadFriends(): Observable<User[]> {
        let username = this.jwtHelper.decodeToken(this.token).sub;
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers}); 
        return this.http.get(this.friendsUrl + username, options).map(this.extractData)
        .catch(error => {
            console.log('Error get request - getUsers ' + error);
            return error;
        });
    }

    loadUser(username: string): Observable<User> {
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.userLoadUrl + username, options).map(this.extractData)
        .catch(error => {
            console.log('Error post request - loadUser ' + error);
            return error;
       }); 
    }

    loadUsers(): Observable<User[]> {
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.usersLoadUrl, options).map(this.extractData)
        .catch(error => {
            console.log("Error get request load users " + error);
            return error;
        })
    }

    findUser(username: string): Observable<String> {
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.userFindUrl + username, options).map(this.extractStringData)
        .catch(error => {
            console.log('Error get request ' + error);
            return error;
        });
    }

    isFriend(usernameFriend: string): Observable<string> {
        let username = this.jwtHelper.decodeToken(this.token).sub;
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.userIsFriendUrl + username, usernameFriend, options).map(this.extractStringData)
        .catch(error => {
            console.log('Error post request ' + error);
            return error;
        });
    }

    addFriend(friendUsername: string): Observable<User> {
        let username = this.jwtHelper.decodeToken(this.token).sub;
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.userAddFriendUrl + username, friendUsername, options).map(this.extractData)
        .catch(error => {
            console.log('Error post request ' + error);
            return error;
        });
    } 

    deleteUser(username: string): Observable<string> {
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.userDeleteUrl + username, options).map(this.extractStringData)
        .catch(error => {
            console.log('Error delete user ' + error);
            return error;
        })
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
