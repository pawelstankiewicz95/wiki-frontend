import { Component } from '@angular/core';
import { SolutionSubject } from '../../models/soultionSubject';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SolutionSubjectService } from '../../services/solution-subject.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './subject-list.component.html',
  styleUrl: './subject-list.component.css'
})
export class SubjectListComponent {

  public subjects: SolutionSubject[] = [];
  hasSearchParameter: boolean = false;
  hasCategoryId: boolean = false;
  categoryId: number = 1;
  searchValue: string = "";

  constructor(private subjectService: SolutionSubjectService,  private route: ActivatedRoute){};

  ngOnInit(): void {
    this.handleShowingSubjects();
    this.route.paramMap.subscribe(params => {
      this.categoryId = +params.get('categoryId')!
      this.searchValue = params.get('searchValue')!
      this.handleShowingSubjects();
    });
  }

  public handleShowingSubjects() {
    this.hasCategoryId = this.route.snapshot.paramMap.has('categoryId');
    this.hasSearchParameter = this.route.snapshot.paramMap.has('searchParam');
    if (this.hasSearchParameter) {
      this.searchSubjectByTitle();
    }
    if (this.hasCategoryId) {
      this.getSubjectsByCategoryId();
    }
  }

  public getSubjectsByCategoryId(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    this.subjectService.getSubjectsByCategoryId(this.categoryId).subscribe((response: SolutionSubject[]) => this.subjects = response);
  }

  public searchSubjectByTitle() {
    this.searchValue = this.route.snapshot.paramMap.get('searchParam')!;
    this.subjectService.getSubjectsByTitleLike(this.searchValue).subscribe((response: SolutionSubject[]) => this.subjects = response);
  }
}
