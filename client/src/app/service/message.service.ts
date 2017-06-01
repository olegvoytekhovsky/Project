import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {JwtHelper} from "angular2-jwt";
import {Message} from "../model/message";

@Injectable()
export class MessageService {
    private jwtHelper: JwtHelper = new JwtHelper();
    private token = localStorage.getItem('currentUser');
    private username = this.jwtHelper.decodeToken(this.token).sub;

    constructor(private http: Http) {
    }

    create(message: string, url: string, id: string): Observable<Message> {
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.post(url + id + '/' + this.username, message, options).map(this.extractData);
    }

    getMessages(url: string, id: string): Observable<Message[]> {
        let headers = new Headers({'Authorization': this.token});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url + id, options).map(this.extractData)
        .catch(error =>{
            console.log(error);
            return error;
        });
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}
