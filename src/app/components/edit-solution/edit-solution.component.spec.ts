import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSolutionComponent } from './edit-solution.component';

describe('EditSolutionComponent', () => {
  let component: EditSolutionComponent;
  let fixture: ComponentFixture<EditSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSolutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
