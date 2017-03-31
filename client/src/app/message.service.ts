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
        var headers = new Headers({'Content-Type': 'application/json'});
        var options = new RequestOptions({headers: headers});
        return this.http.post(url + id, {message}, options).map(this.extractData);
    }

    getMessages(url: string, id: string): Observable<Message[]> {
        return this.http.get(url + id).map(this.extractData)
            .catch(error => error);
    }

    private extractData(res: Response) {
        var body = res.json();
        return body || {};
    }
}
