import { TestBed } from '@angular/core/testing';

import { SolutionSubjectService } from './solution-subject.service';

describe('SolutionSubjectService', () => {
  let service: SolutionSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolutionSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
