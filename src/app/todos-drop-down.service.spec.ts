import { TestBed, inject } from '@angular/core/testing';

import { TodosDropDownService } from './todos-drop-down.service';

describe('TodosDropDownService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodosDropDownService]
    });
  });

  it('should be created', inject([TodosDropDownService], (service: TodosDropDownService) => {
    expect(service).toBeTruthy();
  }));
});
