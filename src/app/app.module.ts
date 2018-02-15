import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http' ; 
import { RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodosDetailComponent } from './todos-detail/todos-detail.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { TodosService } from './todos.service';
import { TodosDropDownService } from './todos-drop-down.service';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { FilterTodosPipe } from './filter-todos.pipe';
import { AuthGuardComponent } from './auth-guard';
import { DeactivateGuardService } from './deactivate-guard';

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full'},
  { path: 'loginForm', component: LoginFormComponent },
  {
    path: 'todos', component: TodosComponent, canActivate: [AuthGuardComponent],
    data: {
      message: 'Add a Todo'
    },
    
  },
  { path: 'todosList', component: TodosListComponent },
  { path: 'todoDetail/:id', component: TodosDetailComponent },
  { path: '**', component: PageNotFoundComponent }
  
];

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodosListComponent,
    PageNotFoundComponent,
    TodosDetailComponent,
    LoginFormComponent,
    CapitalizeFirstPipe,
    FilterTodosPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TodosService, TodosDropDownService, AuthGuardComponent, DeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
