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
        state('inactive', style({
          backgroundColor: '#fff',
          transform: 'scale(1)'
        })),
        transition('inactive => active', animate('500ms ease-in')),
        transition('active => inactive', animate('500ms ease-out'))
      ]
    ),
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(400, keyframes([
          style({ backgroundColor: "red" }), // offset = 0
          style({ backgroundColor: "blue" }), // offset = 0.33
          style({ backgroundColor: "orange" }), // offset = 0.66
          style({ backgroundColor: "black" }) // offset = 1
        ]))
      ]),
      transition(':leave', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('0.100s 0.1s ease', style({
            transform: 'translateX(0)',
            width: 120
          })),
          animate('0.3s ease', style({
            opacity: 1
          }))
        ])
      ])
    ])

  ]
})
export class TodosListComponent implements OnInit {

  stateExpression: String;
  

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

  mouseEnter() {
    this.activeState();
  }
  mouseLeave() {
    this.inactiveState();
  }
  inactiveState() { this.stateExpression = 'inactive'; }
  activeState() { this.stateExpression = 'active'; }

  animationStarted(e) {
    console.log('Animation Started', e)
  }
  
  animationDone(e) {
    console.log('Animation Done', e)
  }

}
