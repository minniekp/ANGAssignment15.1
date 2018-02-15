import { Pipe, PipeTransform } from '@angular/core';

/*
This pipe searches first names of added todos using the search key entered as argument.
*/


@Pipe({
  name: 'filterTodos'
})
export class FilterTodosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value, args);
    if(typeof args === 'undefined') {
      return value;
    }

    var filteredTasks =  value.filter(function(el) {
      //return el.task.startsWith(args);
      let pos = el.task.indexOf(args);
      if(pos > -1)
        return true;
      else
        return false;
    });

    return filteredTasks;
  }
  }


