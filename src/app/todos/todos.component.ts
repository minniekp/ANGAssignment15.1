import { Component, OnInit } from '@angular/core';
import { ITodoList } from '../interface/interface1';
import { TodosService } from '../todos.service';
import { ITodoType } from '../interface/interface2';
import { TodosDropDownService } from '../todos-drop-down.service';
import { CommonFunction } from '../common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

declare const alertify: any;

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  /**Public variable */
  todosArray: ITodoList[] = [];
  todoType: Observable<ITodoType[]>;
  title: string = '';
  private searchData: string;
  todoModel: ITodoList;
  todoDetail: ITodoList;

  /** Using constructor, call the todoService.
     this shorthand syntax automatically creates and
    initializes a new private member in the class */
  constructor(private route: ActivatedRoute,
    private todoService: TodosService, private todoDropDown: TodosDropDownService, private router: Router) { }

  ngOnInit() {
    this.todosModel();
    this.route.data.forEach((data: any) => {
      this.title = data.message;
      this.todoType = data.todoType;
    });
  }

  todosModel() {
    /**Define default values */
    return this.todoModel = {
      firstName: '',
      lastName: '',
      todoType: '',
      dob: new CommonFunction().getCurrentDate()
    };
  };

  /**Add a todo */
  addTodo(values) {

    this.todoDetail = {
      firstName: values.firstName,
      lastName: values.lastName,
     
      todoType: values.todoType,
      
      dob: values.dob
    };

    /**Call function from service. */
    this.todoService.addTodo(this.todoDetail).subscribe(data => {
      /**Using 3rd party library to show message. */
      alertify.notify('Todo Added Successfully', 'success', 2);
      /**Redirecting page to todosList */
      this.router.navigate(['/todosList']);
    },
      error => console.log(error));
  };

  canDeactivate() {
    if (this.todoModel.firstName !== '') {
      return window.confirm('Do you really want to navigate?');
    }
    return true;
  };

}
