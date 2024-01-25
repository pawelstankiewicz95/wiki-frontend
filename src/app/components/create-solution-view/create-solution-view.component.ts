import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';
import { Solution } from '../../models/solution';
import { SolutionService } from '../../services/solution.service';

@Component({
  selector: 'app-create-solution-view',
  standalone: true,
  imports: [QuillModule, ReactiveFormsModule],
  templateUrl: './create-solution-view.component.html',
  styleUrl: './create-solution-view.component.css'
})
export class CreateSolutionViewComponent {
  
  
  constructor(private formBuilder: FormBuilder, private solutionService: SolutionService){}

  solutionForm!: FormGroup;

  ngOnInit() {
    this.handleFormGroup();
  }

  handleFormGroup() {
    this.solutionForm = this.formBuilder.group({
      solution: this.formBuilder.group({
        'title': new FormControl(''),
        'description': new FormControl(''),
      })
    });
  }

  onSubmit() {
    const formValues = this.solutionForm.value;
    let solution: Solution = {
      solutionSubject: {
        title: formValues.solution.title,
        id: 0,
        timeCreated: new Date(),
        timeUpdated: new Date(),
      },
      id: 0,
      description: formValues.solution.description,
      timeCreated: new Date(),
      timeUpdated: new Date()
    };
    this.solutionService.saveSolution(solution).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error)
    });
  }
}
