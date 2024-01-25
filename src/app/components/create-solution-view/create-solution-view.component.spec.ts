import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSolutionViewComponent } from './create-solution-view.component';

describe('CreateSolutionViewComponent', () => {
  let component: CreateSolutionViewComponent;
  let fixture: ComponentFixture<CreateSolutionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSolutionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSolutionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
