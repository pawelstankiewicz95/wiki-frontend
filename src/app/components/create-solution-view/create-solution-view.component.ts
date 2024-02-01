import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';
import { Solution } from '../../models/solution';
import { SolutionService } from '../../services/solution.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-create-solution-view',
  standalone: true,
  imports: [QuillModule, ReactiveFormsModule],
  templateUrl: './create-solution-view.component.html',
  styleUrl: './create-solution-view.component.css'
})
export class CreateSolutionViewComponent {


  constructor(private formBuilder: FormBuilder,
    private solutionService: SolutionService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  solutionForm!: FormGroup;

  editorStyle = {
    height: '300px',
    width: '100%',
    backgroundColor: '#ffffff'
  }

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
          description: formValues.description,
          timeCreated: new Date(),
          timeUpdated: new Date()
        };
        console.log(solution);
        this.solutionService.saveSolution(solutionSubjectId, solution).subscribe({
          next: (response) => {
            const url = this.router.url;    
            let updatedUrl = url.substring(0, url.lastIndexOf('/'));
            this.router.navigate([updatedUrl]) .then(() => {
              window.location.reload();
            });
          },
          error: (error) => console.log(error)
        });
      } else {
        console.error('Invalid subjectId');
      }
    });
  }
}
