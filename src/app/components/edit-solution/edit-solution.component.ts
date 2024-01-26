import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { SolutionService } from '../../services/solution.service';
import { ActivatedRoute } from '@angular/router';
import { Solution } from '../../models/solution';

@Component({
  selector: 'app-edit-solution',
  standalone: true,
  imports: [QuillModule, ReactiveFormsModule],
  templateUrl: './edit-solution.component.html',
  styleUrl: './edit-solution.component.css'
})
export class EditSolutionComponent {

  constructor(private formBuilder: FormBuilder, private solutionService: SolutionService, private activatedRoute: ActivatedRoute) { }

  solution!: Solution;
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

  public getPrograms(): void {
    this.solutionService.getSolutionById().subscribe((response: Solution) => this.solution = response);
  }

}
