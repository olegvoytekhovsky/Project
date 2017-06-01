import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/map";

@Injectable()
export class AuthenticationService {
    error401: string = '';
    errorStatusAddedSource = new Subject<string>();
    errorStatusAdded$ = this.errorStatusAddedSource.asObservable();

    constructor(private http: Http) {}

    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('/project/login', JSON.stringify({username: username, password: password}), options)
        .map((response: Response) => {
            let token = response.headers.get("Authorization").slice(7);
            if(token != null) {
                localStorage.setItem('currentUser', token);
                return true;
            } else {
                return false;
            } 
        }).catch(error => {
            if(error.status == 401) {
                this.error401 = 'Invalid username or password';
            } 
            console.log('Authentication error ' + error);
            return error
        });
    }
}
