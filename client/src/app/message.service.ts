import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import {Message} from "./message";

@Injectable()
export class MessageService {
    constructor(private http: Http) {
    }

    create(message: String, url: string, id: string): Observable<Message> {
        var headers = new Headers({'Authorization': localStorage.getItem('currentUser')});
        var options = new RequestOptions({headers: headers});
        return this.http.post(url + id, {message}, options).map(this.extractData);
    }

    getMessages(url: string, id: string): Observable<Message[]> {
        let headers = new Headers({'Authorization': localStorage.getItem('currentUser')});
        let options = new RequestOptions({headers: headers});
        return this.http.get(url + id, options).map(this.extractData)
        .catch(error =>{
            console.log(error);
            return error;
        });
    }

    private extractData(res: Response) {
        var body = res.json();
        return body || {};
    }
}
