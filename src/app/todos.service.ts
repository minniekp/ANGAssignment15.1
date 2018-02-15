import { Injectable } from '@angular/core';
import { ITodoList } from './interface/interface1';
import { ITodoType } from './interface/interface2';
import { CommonFunction } from './common';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TodosService {

  private url: string = 'http://localhost:3000/api/';

  constructor(private _http: Http) { }

   /** Add todo in the array List. */
   addTodo(todoDetail: ITodoList) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this._http.post(`${this.url}addTodos`, { todoDetail }, options)
      .map(this.extractData)
      .catch(this.handleErrors);
  };

  /**Get the todo list from the array. */
  getTodoList(): Observable<ITodoList[]> {
    return this._http.get(`${this.url}getTodos`)
      .map(this.extractData)
      .catch(this.handleErrors);
  }

  /**Delete a todo */
  deleteTodo(todoId: string) {
    return this._http.delete(`${this.url}deleteTodo/${todoId}`, )
      .map(this.extractData)
      .catch(this.handleErrors);
  };

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  };

  private handleErrors(error: Response) {
    return Observable.throw(error);
  };

}
