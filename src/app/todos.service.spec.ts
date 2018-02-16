import { async, ComponentFixture, TestBed, getTestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule,
  Response, ResponseOptions, RequestMethod
} from '@angular/http';
import { ITodoList } from './interface/interface1';

import { TodosService } from './todos.service';

describe('TodosService', () => {
  let mockBackend: MockBackend;

  // All heed this block - it is required so that the test injector
  // is properly set up. Without doing this, you won't get the
  // fake backend injected into Http.

  // Also, you need to inject MockBackend as a provider before you wire
  // it to replace XHRBackend with the provide function!  So this is all
  // extremely important to set up right.
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosService,
                  MockBackend,
                  BaseRequestOptions,
                  {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory:
                    (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                      return new Http(backend, defaultOptions);
                    }
                  }
                ],
                imports: [
                  HttpModule
                ]
    });
    mockBackend = getTestBed().get(MockBackend);
  });

  it('should be created', inject([TodosService], (service: TodosService) => {
    expect(service).toBeTruthy();
  }));

  it('should get todosList', (done) => {
    let todoService: TodosService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
              body: [
                {
                  'firstName': 'Mrunalini',
                  'lastName': 'Prasad',
                  'todoType': 'Learn React',
                  'dob': '1975-04-10'
                },
                {
                  'firstName': 'Rahul',
                  'lastName': 'Dravid',
                  'todoType': 'Learn Angular',
                  'dob': '1971-04-10'
                }
              ]
            }
            )));
        });

      todoService = getTestBed().get(TodosService);
      expect(todoService).toBeDefined();

      todoService.getTodoList().subscribe((todoList: ITodoList[]) => {
        expect(todoList.length).toBeDefined();
        expect(todoList.length).toEqual(2);
        expect(todoList.length).not.toBe(1);
        done();
      });
    });
  });

});
