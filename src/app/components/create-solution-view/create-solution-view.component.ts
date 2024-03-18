import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { QuillModule } from 'ngx-quill';
import { Solution } from '../../models/solution';
import { SolutionService } from '../../services/solution.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SolutionSubjectService } from '../../services/solution-subject.service';
import DOMPurify from 'dompurify';

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
              private subjectService: SolutionSubjectService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  solutionForm!: FormGroup;
  categoryId: number | undefined;

  subject = new FormControl('');

  editorStyle = {
    height: '300px',
    width: '100%',
    backgroundColor: '#ffffff',
  }


  ngOnInit() {
    this.handleFormGroup();
    this.activatedRoute.queryParams.subscribe(params => {
      const solutionSubjectId = +params['subjectId'];
      if (!isNaN(solutionSubjectId)) {
        this.categoryId = undefined;
      } else {
        this.categoryId = +params['categoryId'];
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
    const cleanDescription = DOMPurify.sanitize(formValues.description);

    this.activatedRoute.queryParams.subscribe(params => {
      const solutionSubjectId = +params['subjectId'];
      if (!isNaN(solutionSubjectId)) {
        this.saveSolution(solutionSubjectId, cleanDescription);
      } else {
        this.categoryId = +params['categoryId'];
        if (!isNaN(this.categoryId)) {
          this.saveSolutionWithSubject(this.categoryId, cleanDescription);
        } else {
          console.log('Error: Invalid parameters');
        }
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
        this.navigateAndShowButton(updatedUrl, false);
      },
      error: (error) => console.log(error)
    });
  }

  saveSolutionWithSubject(categoryId: number, description: string) {
    const solution: Solution = {
      solutionSubject: {
        id: 0,
        title: this.subject.value!,
        timeCreated: new Date()
      },
      id: 0,
      description: description,
      timeCreated: new Date()
    };
    console.log(solution);
    this.solutionService.saveSolutionWithSubject(categoryId, solution).subscribe({
      next: () => {
        const updatedUrl = this.getUpdatedUrl();
        this.navigateAndShowButton(updatedUrl, true);
      },
      error: (error) => console.log(error)
    });
  }

  getUpdatedUrl(): string {
    const url = this.router.url;
    return url.substring(0, url.lastIndexOf('/'));
  }

  navigateAndShowButton(url: string, isSubject: boolean) {
    this.router.navigate([url]).then(() => {
      if (isSubject) {
        this.subjectService.addButtonHidden(false);
      } else {
        this.solutionService.addButtonHidden(false);
      }
    });
  }
}