import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {
    token: string;
    constructor(private http: Http) {}

    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('/project/login', JSON.stringify({username: username, password: password}), options)
        .map((response: Response) => {
            var token = response.headers.get("Authorization").slice(7);
            if(token != null) {
                localStorage.setItem('currentUser', token);
                this.token = token.slice(7);
                return true;
            } else {
                return false;
            } 
        }).catch(error => { 
            console.log(error);
            return error
        });
    }
}
