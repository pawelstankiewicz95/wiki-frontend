import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolutionSubject } from '../../models/soultionSubject';
import { SolutionSubjectService } from '../../services/solution-subject.service';
import DOMPurify from 'dompurify';

@Component({
  selector: 'app-create-subject',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.css'
})
export class CreateSubjectComponent {

  subject = new FormControl('');

  constructor(private activatedRoute: ActivatedRoute,
    private subjectService: SolutionSubjectService,
    private router: Router) { }


  onSubmit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const categoryId = +params['categoryId'];
      if (!isNaN(categoryId)) {
        this.saveSubject(categoryId);
      } else {
        console.log('Error: Invalid parameters');
      }
    });
  }

  saveSubject(categoryId: number) {
    const subject: SolutionSubject = {
      id: 0,
      title: DOMPurify.sanitize(this.subject.value!),
      timeCreated: new Date()
    }
    console.log(subject);
    this.subjectService.saveSubject(categoryId, subject).subscribe({
      next: () => {
        const updatedUrl = this.getUpdatedUrl();
        this.navigateAndShowButton(updatedUrl);
      },
      error: (error) => console.log(error)
    });
  }

  getUpdatedUrl(): string {
    const url = this.router.url;
    return url.substring(0, url.lastIndexOf('/'));
  }

  navigateAndShowButton(url: string) {
    this.router.navigate([url]).then(() => {
      this.subjectService.addButtonHidden(false);
    });
  }


}
