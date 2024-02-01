import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { SolutionService } from '../../services/solution.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Solution } from '../../models/solution';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-solution',
  standalone: true,
  imports: [QuillModule, ReactiveFormsModule, RouterModule],
  templateUrl: './edit-solution.component.html',
  styleUrl: './edit-solution.component.css'
})
export class EditSolutionComponent {

  constructor(private formBuilder: FormBuilder,
    private solutionService: SolutionService,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  solution!: Solution;
  solutionForm!: FormGroup;
  solutionId!: number;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.hasOwnProperty('solutionId')) {
        this.solutionId = +params['solutionId'];;
        this.solutionService.getSolutionById(this.solutionId).subscribe((response: Solution) => {this.solution = response
        console.log(this.solution)});
        this.handleFormGroup()
        this.bindSolutionForm();
      }
      else {
        console.error('Invalid solutionId');
      }
    });
  }

  handleFormGroup() {
    this.solutionForm = this.formBuilder.group({
      'description': new FormControl('')
    });
  }

  onSubmit() {
    const formValues = this.solutionForm.value;

    this.activatedRoute.queryParams.subscribe

    let solution: Solution = {
      id: this.solution.id,
      description: formValues.description,
      timeCreated: this.solution.timeCreated,
      timeUpdated: new Date(),
      solutionSubject: this.solution.solutionSubject
    };

    this.solutionService.updateSolution(solution).subscribe({
      next: (response) => {
        console.log(response)
        this.location.back();
      },
      error: (error) => console.log(error)
    });

  }

  bindSolutionForm() {
    setTimeout(() => {
      this.solutionForm.patchValue({
        description: this.solution.description
      });
    });

  }
}