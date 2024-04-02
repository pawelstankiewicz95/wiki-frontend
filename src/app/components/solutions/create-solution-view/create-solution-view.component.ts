import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import DOMPurify from 'dompurify';
import { QuillModule } from 'ngx-quill';
import { Solution } from '../../../models/solution';
import { SolutionSubject } from '../../../models/soultionSubject';
import { SolutionService } from '../../../services/solution.service';

@Component({
  selector: 'app-create-solution-view',
  standalone: true,
  imports: [QuillModule, ReactiveFormsModule],
  templateUrl: './create-solution-view.component.html',
  styleUrl: './create-solution-view.component.css'
})
export class CreateSolutionViewComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private solutionService: SolutionService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  solutionForm!: FormGroup;
  categoryId: number | undefined;


  editorStyle = {
    height: '300px',
    width: '100%',
    backgroundColor: '#ffffff',
  }


  ngOnInit() {
    this.handleFormGroup();
    this.solutionService.addButtonHidden(true);
  }

  handleFormGroup() {
    this.solutionForm = this.formBuilder.group({
      'description': new FormControl('')
    });

  }

  onSubmit() {
    const formValues = this.solutionForm.value;
    const cleanDescription = DOMPurify.sanitize(formValues.description);

    this.activatedRoute.queryParams.subscribe(params => {
      const solutionSubjectId = +params['subjectId'];
      if (!isNaN(solutionSubjectId)) {
        this.saveSolution(solutionSubjectId, cleanDescription);
      } else {
        console.log('Error: Invalid parameters');
      }
    });
  }

  saveSolution(solutionSubjectId: number, description: string) {
    const solution: Solution = {
      id: 0,
      description: description,
      timeCreated: new Date(),
    };
    console.log(solution);
    this.solutionService.saveSolution(solutionSubjectId, solution).subscribe({
      next: () => {
        const updatedUrl = this.getUpdatedUrl();
        this.navigate(updatedUrl);
      },
      error: (error) => console.log(error)
    });
  }

  getUpdatedUrl(): string {
    const url = this.router.url;
    return url.substring(0, url.lastIndexOf('/'));
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}