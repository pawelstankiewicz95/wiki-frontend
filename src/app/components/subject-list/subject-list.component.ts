import { Component } from '@angular/core';
import { SolutionSubject } from '../../models/soultionSubject';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SolutionSubjectService } from '../../services/solution-subject.service';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [RouterModule],
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
    this.getSubjectsByCategoryId();
  }

  public handleShowingSubjects() {
    this.hasCategoryId = this.route.snapshot.paramMap.has('id');
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
