import { ITodoList } from './../interface/interface1';
import { Component, OnInit, trigger, state, animate, transition, style, keyframes, group } from '@angular/core';
import { TodosService } from '../todos.service';
import { Observable } from 'rxjs/Observable';

declare const alertify: any;

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
  animations: [
    trigger('todoState',
      [
        state('active', style({
          backgroundColor: '#cfd8dc',
          transform: 'scale(1.1)'
        })),
      ]
    ),
  ]
})
export class TodosListComponent implements OnInit {

  todoDetail: Observable<ITodoList[]> | any[];
  private searchData: string;
 
  
  /** Using constructor, call the todosService.
      this shorthand syntax automatically creates and
      initializes a new private member in the class */
  constructor(private todoService: TodosService) { }


  ngOnInit() {
    this.searchData = '';
    /**Get the cricketerDetail from cricketer-app  */
    this.todoDetail = this.todoService.getTodoList();
  };

  deleteData(todoId) {
    this.todoService.deleteTodo(todoId).subscribe(data => {
      /**Using 3rd party library to show message. */
      alertify.notify(' Deleted Successfully', 'success', 2);
      this.todoDetail = this.todoService.getTodoList();
    },
      error => console.log(error));
  };

}
