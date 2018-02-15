import { Injectable } from '@angular/core';
import { ITodoType } from './interface/interface2';
import { Http, RequestOptions, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TodosDropDownService {

  private url: string = "http://localhost:3000/api/";

  constructor(private _http: Http) { }

  /** Get the player Type */
  getTodoType(): Observable<ITodoType[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this._http.get(`${this.url}getTodoType`, options)
      .map(this.extractData)
      .catch(this.handleErrors)
  };

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  };
  
  private handleErrors(error: Response) {
    return Observable.throw(error);
  };

}
