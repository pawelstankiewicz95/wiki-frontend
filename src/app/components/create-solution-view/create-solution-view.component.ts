import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';
import { Solution } from '../../models/solution';
import { SolutionService } from '../../services/solution.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-solution-view',
  standalone: true,
  imports: [QuillModule, ReactiveFormsModule],
  templateUrl: './create-solution-view.component.html',
  styleUrl: './create-solution-view.component.css'
})
export class CreateSolutionViewComponent {


  constructor(private formBuilder: FormBuilder, private solutionService: SolutionService, private activatedRoute: ActivatedRoute) { }

  solutionForm!: FormGroup;

  ngOnInit() {
    this.handleFormGroup();
  }

  handleFormGroup() {
    this.solutionForm = this.formBuilder.group({
      'description': new FormControl('')
    });
  }

  onSubmit() {
    const formValues = this.solutionForm.value;

    this.activatedRoute.queryParams.subscribe(params => {
      const solutionSubjectId = +params['subjectId'];
      if (!isNaN(solutionSubjectId)) {
        let solution: Solution = {
          id: 0,
          description: formValues.solution.description,
          timeCreated: new Date(),
          timeUpdated: new Date()
        };

        this.solutionService.saveSolution(solutionSubjectId, solution).subscribe({
          next: (response) => console.log(response),
          error: (error) => console.log(error)
        });
      } else {
        console.error('Invalid subjectId');
      }
    });
  }
}
